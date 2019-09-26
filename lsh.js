/**
 * based on: https://github.com/joaocunha/javascript-localstorage-handler/blob/master/LocalStorageHandler.js
 */

class LSH {

    /**
     * @property _ls
     * @private
     * @type Object
     */
    _ls = window.localStorage;

    /**
     * @method get
     * @param key {String} Item key
     * @return {String|Object|Null}
     */
    get = function(key) {
        try {
            return JSON.parse(this._ls.getItem(key));
        } catch (e) {
            return this._ls.getItem(key);
        }
    };

    /**
     * @method set
     * @param key {String} Item key
     * @param val {String|Object} Item value
     * @return {String|Object} The value of the item just set
     */
    set = function(key, val) {
        this._ls.setItem(key, JSON.stringify(val));
        return this.get(key);
    };

    /**
     * @method key
     * @param index {Number} Item index
     * @return {String|Null} The item key if found, null if not
     */
    key = function(index) {
        if (typeof index === 'number') {
            return this._ls.key(index);
        }
    };

    /**
     * @method data
     * @return {Array|Null} An array containing all items in localStorage through key{string}-value{String|Object} pairs
     */
    data = function() {
        var i = 0;
        var data = [];

        while (this._ls.key(i)) {
            data[i] = [this._ls.key(i), this.get(this._ls.key(i))];
            i++;
        }

        return data.length ? data : null;
    };

    /**
     * @method remove
     * @param keyOrIndex {String|Number} Item key or index (which will be converted to key anyway)
     * @return {Boolean} True if the key was found before deletion, false if not
     */
    remove = function(keyOrIndex) {
        var result = false;
        var key = (typeof keyOrIndex === 'number') ? this.key(keyOrIndex) : keyOrIndex;

        if (key in this._ls) {
            result = true;
            this._ls.removeItem(key);
        }

        return result;
    };

    /**
     * @method clear
     * @return {Number} The total of items removed
     */
    clear = function() {
        var len = this._ls.length;
        this._ls.clear();
        return len;
    };
}