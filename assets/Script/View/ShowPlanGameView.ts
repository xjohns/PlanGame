// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {PlanContext} from "../PlanContext";
import {IPlanModel} from "../Model/IPlanModel";

const {ccclass, property} = cc._decorator;

@ccclass
export class ShowPlanGameView extends cc.Component {

    @property(cc.Label)
    planlabel: cc.Label = null;

    @property(cc.Button)
    confirmButton: cc.Button = null;

    private forePlanString: string = '';
    private afterPlanString: string = '';
    private nightPlanString: string = '';
    // private effectString: string = '';
    // private totalEffect: IPlanModel = {};

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (let i = 1; i <= PlanContext.foreTaskList.length; i++)
        {
            this.forePlanString.concat(PlanContext.foreTaskList[i-1] + ', ');
        }
        for (let i = 1; i <= PlanContext.afterTaskList.length; i++)
        {
            this.afterPlanString.concat(PlanContext.afterTaskList[i-1] + ', ');
        }
        for (let i = 1; i <= PlanContext.nightTaskList.length; i++)
        {
            this.nightPlanString.concat(PlanContext.nightTaskList[i-1] + ', ');
        }
        this.planlabel.string = '上午你打算' + this.forePlanString + '。\n' + '下午你开始' + this.afterPlanString + '。\n' + '到了晚上你准备' + this.nightPlanString + '。\n嗯，不管怎样，一天还是过去了。';
        this.confirmButton.node.on('click', event1 => {
            cc.director.loadScene('StartPlan');
        });
    }

    start () {

    }

    // update (dt) {}
}
