export function metadataHashPath (item_path) {
    let path = '';
    if (item_path == '') {
        path = 'root';
    } else {
        path = item_path;
    }

    path = path.replace(/ /g, "_")
        .replace(/\//g, "-")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/#/g, "")
        .replace(/&/g, "")
        .replace(/,/g, "")
        .replace(/\[/g, "")
        .replace(/\]/g, "")
        .replace(/"/g, "")
        .replace(/'/g, "")
        .replace(/_-_/g, "-")
        .toLowerCase();
    return path;
};

export function thumbnailCachePath (media_item) {
    let path = '/cache/thumbs/';
    path += media_item.hash.substring(0, 2);
    path += '/';
    path += media_item.hash.substring(2);
    path += '_' + media_item.previews[0];
    path += ".jpg";
    return path;
};