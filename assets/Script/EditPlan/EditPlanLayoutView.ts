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
import {PlanContext} from "../PlanContext";

@ccclass
export default class EditPlanLayoutView extends cc.Component {

    @property(cc.Label)
    planNameLabel: cc.Label = null;

    @property(cc.Node)
    wisdomLayout: cc.Node = null;

    @property(cc.Node)
    healthLayout: cc.Node = null;

    @property(cc.Node)
    funLayout: cc.Node = null;

    @property(cc.Node)
    timeLayout: cc.Node = null;

    @property(cc.Button)
    saveButton: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.planNameLabel.string = '计划名： ' + PlanContext.planName;
        this.planNameLabel.node.on('click', event1 => {
            console.log('修改计划名');
        })
        this.saveButton.node.on('click', event2 => {
            this.savePlanContext();
            cc.director.loadScene('Main');
        })
    }

    savePlanContext ()
    {
        console.log('保存计划的数值');
    }

    start () {

    }

    // update (dt) {}
}
