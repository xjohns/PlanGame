// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {PlanContext} from "./PlanContext";

const {ccclass, property} = cc._decorator;


@ccclass
export class MainView extends cc.Component {

    @property(cc.Button)
    startButton: cc.Button = null;

    @property(cc.Button)
    addButton: cc.Button = null;

    @property(cc.Node)
    addPlanALert: cc.Node = null;

    @property(cc.Button)
    addPlanConfirmButton: cc.Button = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('Main onLoad');
        // PlanContext.init();
        this.startButton.node.on('click', event1 => {
            if (PlanContext.localPlans.length)
            {
                cc.director.loadScene('StartPlan');
            }
            else
            {
                this.addPlanALert.active = true;
            }
        });

        this.addButton.node.on('click', event1 => {
            cc.director.loadScene('EditPlan');
        });

        this.addPlanConfirmButton.node.on('click', event1 => {
            this.addPlanALert.active = false;
        });
    }

    start () {

    }

    // update (dt) {}
}
