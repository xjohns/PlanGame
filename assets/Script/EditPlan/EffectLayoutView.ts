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
export class EffectLayoutView extends cc.Component {

    @property(cc.Label)
    effectLabel: cc.Label = null;

    @property(cc.Button)
    plusButton: cc.Button = null;

    @property(cc.Button)
    minusButton: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.plusButton.node.on('click', event1 => {
            console.log('加的处理')
        })
    }

    public displayEffectLabel (effectOrder: number)
    {
        switch (effectOrder){
            case 1:
                this.effectLabel.string = '智慧： ' + PlanContext.effctWisdom.toString();
                break;
            case 2:
                this.effectLabel.string = '健康： ' + PlanContext.effctHealth.toString();
                break;
            case 3:
                this.effectLabel.string = '娱乐： ' + PlanContext.effctFun.toString();
                break;
            case 4:
                this.effectLabel.string = '耗时： ' + PlanContext.effctTime.toString();
                break;
        }
        console.log('展示相关文本 = ' + effectOrder);
    }

    public updateEffectLabel ()
    {
        console.log('更新文本');
    }

    start () {

    }

    // update (dt) {}
}
