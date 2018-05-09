// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlanLayoutView extends cc.Component {

    @property(cc.Button)
    contentButton1: cc.Button = null;

    @property(cc.Button)
    contentButton2: cc.Button = null;

    @property(cc.Button)
    contentButton3: cc.Button = null;

    @property(cc.Button)
    contentButton4: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dispalyPlan();
        this.contentButton1.node.on('click', event1 => {
            console.log('弹出任务清单弹窗');
        })
    }

    start () {

    }

    public dispalyPlan ()
    {
        console.log('显示已设置的任务');
    }

    // update (dt) {}
}
