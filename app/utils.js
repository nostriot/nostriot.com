import { kv } from "@vercel/kv";
const { useWebSocketImplementation } = require('nostr-tools/relay')
const { Relay } = require('nostr-tools/relay');
import dotenv from 'dotenv';
import redisClient from "@/app/redisClient";

dotenv.config();

const { WebSocket } = require('ws')
useWebSocketImplementation(WebSocket)

/**
 * Converts a Unix timestamp to a human-readable date string.
 * @param {number} timestamp - The Unix timestamp to convert.
 * @returns {string} - The formatted date string.
 */
function unixTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export { unixTimestampToDate };


const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function getOrSetCache(key, fetchData) {
    try {
        const cachedData = await redisClient.get(key); // Get data from Redis
        const now = Date.now();

        if (process.env.NOSTR_REDIS_CACHE_ENABLED === 'true' && cachedData) {
            const parsedData = JSON.parse(cachedData);

            if (parsedData.expiry > now) {
                console.log('Cache exists and has not expired, returning:', key);
                return parsedData.value; // Return the cached value
            } else {
                console.log('Cache has expired for key:', key);
            }
        } else if (process.env.NOSTR_REDIS_CACHE_ENABLED === 'false') {
            console.log('NOSTR_REDIS_CACHE_ENABLED is "false"');
        } else {
            console.log('No cache found for key:', key);
        }

        // If cache is expired, disabled, or not found, fetch new data
        console.log('Fetching new data for key:', key);
        const newData = await fetchData();
        const expiry = now + CACHE_TTL;

        const dataToCache = JSON.stringify({ value: newData, expiry });

        // Set new data in Redis with an expiry time
        await redisClient.set(key, dataToCache);

        return newData;
    } catch (error) {
        console.error('Error accessing Redis cache:', error);
        // Fallback: fetch new data if Redis fails
        const newData = await fetchData();
        return newData;
    }
}

export async function getArticlesByAuthor(authorNpubHex, relayUrl) {
    try {
        const relay = await Relay.connect(relayUrl);

        return new Promise((resolve, reject) => {
            const events = [];
            const sub = relay.subscribe(
                [
                    {
                        kinds: [30023],
                        authors: [authorNpubHex],
                        limit: 100,
                    },
                ],
                {
                    onevent(event) {
                        events.push(event);
                    },
                    oneose() {
                        sub.close();
                        relay.close();
                        resolve(events);
                    },
                }
            );

            // Timeout after 30 seconds
            setTimeout(() => {
                sub.close();
                relay.close();
                resolve(events);  // Resolve with whatever events have been collected so far
            }, 30000);
        });
    } catch (error) {
        console.error('Error connecting to relay:', error);
        return [];
    }
}

export async function getUserProfile(authorNpubHex, relayUrl) {
    try {
        const relay = await Relay.connect(relayUrl);

        return new Promise((resolve, reject) => {
            const events = [];
            const sub = relay.subscribe(
                [
                    {
                        kinds: [0],
                        authors: [authorNpubHex],
                        limit: 1,
                    },
                ],
                {
                    onevent(event) {
                        events.push(event);
                    },
                    oneose() {
                        sub.close();
                        relay.close();
                        const profile = events[0] && JSON.parse(events[0].content);
                        resolve(profile);
                    },
                }
            );

            // Timeout after 30 seconds
            setTimeout(() => {
                sub.close();
                relay.close();
                resolve(events);  // Resolve with whatever events have been collected so far
            }, 30000);
        });
    } catch (error) {
        console.error('Error connecting to relay:', error);
        return [];
    }
}

export async function getCachedUserProfile(authorNpubHex, relayUrl) {
    return await getOrSetCache(process.env.KV_PREFIX + '-user-profile', async () => {
        return await getUserProfile(authorNpubHex, relayUrl);
    });
}

export async function getCachedArticles(authorNpubHex, relayUrl) {
    return await getOrSetCache(process.env.KV_PREFIX + '-articles', async () => {
        return await getArticlesByAuthor(authorNpubHex, relayUrl);
    });
}

// export a function to slugify a string to be used in URIs
export function slugify(string) {
    return string.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function deslugify(string) {
    let deslugged = string.replace(/-/g, ' ');
    deslugged = deslugged.replace(/\b\w/g, l => l.toUpperCase());
    return deslugged
}

export function slugifyForUri(string) {
    let slug = slugify(string).substring(0, 50);
    slug = slug.replace(/-+$/, '');
    return slug
}
