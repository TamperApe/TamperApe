import ArrayEx from './Common';

const Storager = require('../lib/Storager');
const uuidv5 = require('uuid/v5');

var ScriptsManager = {
    async getScriptList() {
        var result = await Storager.getStorage("ScriptSourceList", true, []);
        return result;
    },
    async appedScript(str) {
        // console.log("appedScript");
        let list = await this.getScriptList();
        let data = eval(str);
        if (!data)
            return;

        data.sourceCode = str;
        data.id = uuidv5(Date.now().toString(), uuidv5.DNS);
        data.enabled = true;
        list.push(data);

        await Storager.setStorage("ScriptSourceList", list);
    },
    async updateScript(script) {
        // console.log("updateScript");
        var list = await Storager.getStorage("ScriptSourceList", true, []);
        const target = list.find(item => item.id === script.id);
        if (!target)
            return;

        Object.assign(target, script);
        await Storager.setStorage("ScriptSourceList", list);
    },
    async deleteScript(id) {
        console.log("deleteScript");
        var list = await Storager.getStorage("ScriptSourceList", true, []);
        const target = list.find(item => item.id === id);
        if (!target)
            return;

        // var index = list.indexOf(target);
        // if (index > -1) {
        //     list.splice(index, 1);
        // }

        list.removeObj(target);

        await Storager.setStorage("ScriptSourceList", list);
    }
}
export default ScriptsManager;