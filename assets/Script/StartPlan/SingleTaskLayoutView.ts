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
export default class SingleTaskLayoutView extends cc.Component {

    @property(cc.Button)
    taskButton: cc.Button = null;

    @property(cc.Label)
    taskLabel: cc.Label = null;

    private action_task: string = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.taskButton.node.on('click', event1 => {
        //     //点击单条任务后的处理
        // })
        //
        // // 单条任务的显示
        // this.taskLabel.string = "你做了.....事情" + this.action_task;
    }

    start () {

    }

    // update (dt) {}
}
