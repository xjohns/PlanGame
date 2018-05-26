// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {IPlanModel} from "../Model/IPlanModel";

const {ccclass, property} = cc._decorator;
import {PlanContext} from "../PlanContext";
import {PlanValue} from "../Model/PlanValue";

@ccclass
export class EditPlanView extends cc.Component {

    @property(cc.Label)
    planNameLabel: cc.Label = null;

    @property(cc.Label)
    wisdomLabel: cc.Label = null;

    @property(cc.Label)
    healthLabel: cc.Label = null;

    @property(cc.Label)
    funLabel: cc.Label = null;

    @property(cc.Label)
    timeSpendLabel: cc.Label = null;

    @property(cc.Button)
    saveButton: cc.Button = null;

    private plan: IPlanModel = {};

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.planNameLabel.node.on('click', event1 => {
            console.log('修改计划名');
        });
        this.saveButton.node.on('click', event2 => {
            this.savePlanContext();
            cc.director.loadScene('Main');
        })
    }

    init()
    {
        this.plan.name = '新计划';
        this.plan.wisdomEffect = PlanValue.perWisdom;
        this.plan.healthEffect = PlanValue.perHealth;
        this.plan.funEffect = PlanValue.perFun;
        this.plan.timeSpend = PlanValue.perTime;
        for (let i = 0 ; i<= 4; i ++)
        {
            this.updateDisplay(i);
        }
    }

    start () {
        this.handleWisdom();
        this.handleHealth();
        this.handleFun();
        this.handleTimeSpend();
    }

    handleWisdom()
    {
        let layout = this.wisdomLabel.node.parent;
        let plusButton = layout.children[1].children[0];
        let minusButton = layout.children[1].children[1];
        plusButton.on('click', event1 => {
            this.plan.wisdomEffect += PlanValue.perWisdom;
            this.updateDisplay(1);
        });
        minusButton.on('click', event1 => {
            this.plan.wisdomEffect -= PlanValue.perWisdom;
            this.updateDisplay(1);
        });
    }

    handleHealth()
    {
        let layout = this.healthLabel.node.parent;
        let plusButton = layout.children[1].children[0];
        let minusButton = layout.children[1].children[1];
        plusButton.on('click', event1 => {
            this.plan.healthEffect += PlanValue.perHealth;
            this.updateDisplay(2);
        });
        minusButton.on('click', event1 => {
            this.plan.healthEffect -= PlanValue.perHealth;
            this.updateDisplay(2);
        });
    }

    handleFun()
    {
        let layout = this.funLabel.node.parent;
        let plusButton = layout.children[1].children[0];
        let minusButton = layout.children[1].children[1];
        plusButton.on('click', event1 => {
            this.plan.funEffect += PlanValue.perFun;
            this.updateDisplay(3);
        });
        minusButton.on('click', event1 => {
            this.plan.funEffect -= PlanValue.perFun;
            this.updateDisplay(3);
        });
    }

    handleTimeSpend()
    {
        let layout = this.timeSpendLabel.node.parent;
        let plusButton = layout.children[1].children[0];
        let minusButton = layout.children[1].children[1];
        plusButton.on('click', event1 => {
            this.plan.timeSpend += PlanValue.perTime;
            this.updateDisplay(4);
        });
        minusButton.on('click', event1 => {
            this.plan.timeSpend -= PlanValue.perTime;
            this.updateDisplay(4);
        });
    }

    updateDisplay(type)
    {
        switch (type)
        {
            case 0:
                this.planNameLabel.string = '计划名： ' + (this.plan.name ? this.plan.name : '');
                break;
            case 1:
                this.wisdomLabel.string = '智慧加成（智慧上限200）: \n' + (this.plan.wisdomEffect >0 ? '+'+ this.plan.wisdomEffect : + this.plan.wisdomEffect);
                break;
            case 2:
                this.healthLabel.string = '健康加成（健康上限100）: \n' + (this.plan.healthEffect >0 ? '+'+ this.plan.healthEffect : + this.plan.healthEffect);
                break;
            case 3:
                this.funLabel.string = '娱乐加成（娱乐上限100）: \n' + (this.plan.funEffect >0 ? '+'+ this.plan.funEffect : + this.plan.funEffect);
                break;
            case 4:
                this.timeSpendLabel.string = '耗时（单位：h）: \n' + (this.plan.timeSpend >0 ? '+'+ this.plan.timeSpend : + this.plan.timeSpend);
                break;
        }
    }

    savePlanContext ()
    {
        PlanContext.savelocalPlanData(this.plan);
        // if (this.plan.wisdomEffect <= PlanValue.maxWisdom && this.plan.healthEffect <= PlanValue.maxHealth && this.plan.funEffect <= PlanValue.maxFun && this.plan.timeSpend <= PlanValue.maxTime)
        // {
        //     PlanContext.savelocalPlanData(this.plan);
        // }
        // else
        // {
        //     console.log('超出最大限制');
        // }
    }

    // update (dt) {}
}
