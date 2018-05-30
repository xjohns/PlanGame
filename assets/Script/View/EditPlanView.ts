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

    @property(cc.EditBox)
    planNameEditBox: cc.EditBox = null;

    @property(cc.Label)
    wisdomLabel: cc.Label = null;

    @property(cc.Label)
    healthLabel: cc.Label = null;

    @property(cc.Label)
    funLabel: cc.Label = null;

    @property(cc.Label)
    timeSpendLabel: cc.Label = null;

    @property(cc.Button)
    backButton: cc.Button = null;

    @property(cc.Button)
    saveButton: cc.Button = null;

    private plan: IPlanModel = {};

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.backButton.node.on('click', event2 => {
            cc.director.loadScene('Main');
        });
        this.saveButton.node.on('click', event2 => {
            this.savePlanContext();
            cc.director.loadScene('Main');
        });
        this.planNameEditBox.node.on('editing-did-ended', event1 => {
            this.plan.name = this.planNameEditBox.string;
            this.planNameEditBox.string = '';
            this.planNameLabel.string = this.plan.name;
        });
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
                this.planNameLabel.string = this.plan.name;
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

    async savePlanContext ()
    {
        for (let planName of PlanContext.planNameList)
        {
            if (planName && this.plan.name == planName)
            {
                console.log('任务名重复');
                return false;
            }
        }
        PlanContext.localPlans.push(this.plan);
        console.log('本地任务, = ', PlanContext.localPlans);
        PlanContext.planNameList.push(this.plan.name);
        await PlanContext.savelocalData('planNameList', PlanContext.planNameList);
        await PlanContext.savelocalSinglePlanData(this.plan.name, this.plan);
        return true;
    }

    // update (dt) {}
}
