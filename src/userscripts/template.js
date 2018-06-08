/*global
ape_getValue
ape_executeAsync
ape_setValue
$
 */

new class template {
    constructor() {
        this.name = 'template';
        this.version = '1.0';
        this.run_at = "document_domloaded";
        this.includes = ['https?://template.*'];
    }

    get_Script() {
        return async function () {

        }
    }
}()