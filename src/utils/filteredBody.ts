/**
 * Filtered the request body for be sure
 * nothing wrong can be pass.
 *
 * @export
 * @param {Object} body - Request body
 * @param {Array[String]} whitelist - Element who want to whitelist
 * @returns {Object} body - Request body filtered
 */
export function filteredBody(body: any, whitelist: string[]): any {
    const items = {};

    Object.keys(body).forEach(key => {
        if (whitelist.indexOf(key) >= 0) {
            items[key] = body[key];
        }
    });

    return items;
}
