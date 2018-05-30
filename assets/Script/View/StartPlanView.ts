// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {MainView} from "../MainView";
import {PlanContext} from "../PlanContext";
import Label = cc.Label;

const {ccclass, property} = cc._decorator;

@ccclass
export class StartPlanView extends cc.Component {

    @property(cc.Button)
    foreAddButton: cc.Button = null;

    @property(cc.Button)
    afterAddButton: cc.Button = null;

    @property(cc.Button)
    nightAddButton: cc.Button = null;

    @property(cc.Node)
    foreContent: cc.Node = null;

    @property(cc.Node)
    afterContent: cc.Node = null;

    @property(cc.Node)
    nightContent: cc.Node = null;

    @property(cc.Node)
    allTaskListView: cc.Node = null;

    @property(cc.Node)
    allTaskContent: cc.Node = null;

    // function view
    @property(cc.Label)
    infoLabel: cc.Label = null;

    @property(cc.Button)
    backButton: cc.Button = null;

    @property(cc.Button)
    sureButton: cc.Button = null;

    // delete task alert view
    @property(cc.Node)
    alertDeleteTaskView: cc.Node = null;

    @property(cc.Label)
    alertContentlabel: cc.Label = null;

    @property(cc.Button)
    alertcancelButton: cc.Button = null;

    @property(cc.Button)
    alertconfirmButton: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.infoLabel.string = '' + new Date();
        this.foreAddButton.node.on('click', event1 => {
           // 弹出上午的可选任务
            this.handleAllTaskList(0);
        });
        this.afterAddButton.node.on('click', event1 => {
            // 弹出下午的可选任务
            this.handleAllTaskList(1);
        });
        this.nightAddButton.node.on('click', event1 => {
            // 弹出夜晚的可选任务
            this.handleAllTaskList(2);
        });
        this.backButton.node.on('click', event1 => {
            // 返回主界面
            cc.director.loadScene('Main');
        });
        this.sureButton.node.on('click', event1 => {
            // 前往任务执行展示页面
            cc.director.loadScene('ShowPlanGame');
        });
    }

    start () {
        for (let i = 0; i <= 2; i ++)
        {
            this.updateTaskContent(i);
        }
    }

    // 这里传入的type暂时只是为了更新相应的scrollView
    async handleAllTaskList(type){
        this.allTaskListView.active = true;
        for (let i = 1; i <= PlanContext.localPlans.length; i ++)
        {
            console.log('childrenCount = ', this.allTaskContent.childrenCount);
            console.log('PlanContext.localPlans.length = ', PlanContext.localPlans.length);
            if (this.allTaskContent.childrenCount < PlanContext.localPlans.length)
            {
                // const allTaskRes = await cc.loader.loadRes("Prefab/item", cc.Prefab, (err, prefab)=> {
                //     const newNode = cc.instantiate(prefab);
                //     this.allTaskContent.addChild(newNode);
                //     console.log('allTaskRes = ', prefab);
                // });
                const prefab = await PlanContext.loadRes('Prefab/item', cc.Prefab);
                const node = cc.instantiate(prefab);
                this.allTaskContent.addChild(node);
                console.log('allTaskRes = ', prefab);
            }
            let item:cc.Node = this.allTaskContent.children[i-1];
            let taskNameLabel = item.children[0].getComponent(Label);
            taskNameLabel.string = PlanContext.localPlans[i-1].name;
            console.log('item = ', item);
            item.off('click');  // 注册相同的事件之前需要先取消监听
            item.on('click', async event1 => {
                console.log('item点击，type = ', type);
                switch (type)
                {
                    case 0:
                        PlanContext.foreTaskList.push(taskNameLabel.string);
                        await PlanContext.savelocalData('foreTaskList', PlanContext.foreTaskList);
                        break;
                    case 1:
                        PlanContext.afterTaskList.push(taskNameLabel.string);
                        await PlanContext.savelocalData('afterTaskList', PlanContext.afterTaskList);
                        break;
                    case 2:
                        PlanContext.nightTaskList.push(taskNameLabel.string);
                        await PlanContext.savelocalData('nightTaskList', PlanContext.nightTaskList);
                        break;
                }
                this.allTaskListView.active = false;
                this.updateTaskContent(type, i-1);
            });
        }
        this.allTaskListView.children[2].on('click', event1 => {
            // 关闭任务列表界面
            this.allTaskListView.active = false;
        });
    }

    // update (dt) {}

    async updateTaskContent(type, ...index){
        console.log('updateTask type = ' + type + ', index = ' + index);
        switch (type)
        {
            case 0:
                for (let i = 1; i <= PlanContext.foreTaskList.length; i ++)
                {
                    console.log('this.foreContent.childrenCount = ', this.foreContent.childrenCount);
                    console.log('PlanContext.foreTaskList.length', PlanContext.foreTaskList.length);
                    if (this.foreContent.childrenCount < PlanContext.foreTaskList.length)
                    {
                        // cc.loader.loadRes("assets/Prefab/item", cc.Prefab, (err, prefab)=> {
                        //     const newNode = cc.instantiate(prefab);
                        //     this.foreContent.addChild(newNode);
                        // });
                        const prefab = await PlanContext.loadRes('Prefab/item', cc.Prefab);
                        const node = cc.instantiate(prefab);
                        this.foreContent.addChild(node);
                        console.log('forePrefab = ', prefab);
                    }
                    let item = this.foreContent.children[i-1];
                    item.active = true;
                    let taskNameLabel = item.children[0].getComponent(Label);
                    taskNameLabel.string = PlanContext.foreTaskList[i-1];
                    item.off('click');
                    item.on('click', event1 => {
                        console.log('i-1 = ', i-1);
                        this.handleDeleteTaskView(taskNameLabel.string, type, i-1);
                    });
                }
                break;
            case 1:
                for (let i = 1; i <= PlanContext.afterTaskList.length; i ++)
                {
                    console.log('this.afterContent.childrenCount = ', this.afterContent.childrenCount);
                    console.log('PlanContext.afterTaskList.length', PlanContext.afterTaskList.length);
                    if (this.afterContent.childrenCount < PlanContext.afterTaskList.length)
                    {
                        // const res = cc.loader.loadRes("Prefab/item", cc.Prefab, (err, prefab)=> {
                        //     const newNode = cc.instantiate(prefab);
                        //     this.afterContent.addChild(newNode);
                        // });
                        // console.log('afterRes = ', res);
                        const prefab = await PlanContext.loadRes('Prefab/item', cc.Prefab);
                        const node = cc.instantiate(prefab);
                        this.afterContent.addChild(node);
                    }
                    let item = this.afterContent.children[i-1];
                    item.active = true;
                    let taskNameLabel = item.children[0].getComponent(Label);
                    taskNameLabel.string = PlanContext.afterTaskList[i-1];
                    item.off('click');
                    item.on('click', event1 => {
                        this.handleDeleteTaskView(taskNameLabel.string, type, i-1);
                    });
                }
                break;
            case 2:
                for (let i = 1; i <= PlanContext.nightTaskList.length; i ++)
                {
                    console.log('this.nightContent.childrenCount = ', this.nightContent.childrenCount);
                    console.log('PlanContext.nightTaskList.length', PlanContext.nightTaskList.length);
                    if (this.nightContent.childrenCount < PlanContext.nightTaskList.length)
                    {
                        // cc.loader.loadRes("Prefab/item", cc.Prefab, (err, prefab)=> {
                        //     const newNode = cc.instantiate(prefab);
                        //     this.nightContent.addChild(newNode);
                        // });
                        const prefab = await PlanContext.loadRes('Prefab/item', cc.Prefab);
                        const node = cc.instantiate(prefab);
                        this.nightContent.addChild(node);
                    }
                    let item = this.nightContent.children[i-1];
                    item.active = true;
                    let taskNameLabel = item.children[0].getComponent(Label);
                    taskNameLabel.string = PlanContext.nightTaskList[i-1];
                    item.off('click');
                    item.on('click', event1 => {
                        this.handleDeleteTaskView(taskNameLabel.string, type, i-1);
                    });
                }
                break;
        }
    }

    handleDeleteTaskView(taskName, type, index){
        this.alertDeleteTaskView.active = true;
        this.alertContentlabel = taskName;
        this.alertcancelButton.node.on('click', event1 => {
            // 取消删除当前单个任务
            this.alertDeleteTaskView.active = false;
        });
        this.alertconfirmButton.node.on('click', event1 => {
            // 确认删除当前单个任务
            switch (type)
            {
                case 0:
                    PlanContext.foreTaskList.splice(index, 1);
                    this.foreContent.children[index].active = false;
                    // this.foreContent.removeChild(index);
                    // this.updateTaskContent(type);
                    break;
                case 1:
                    PlanContext.afterTaskList.splice(index, 1);
                    this.afterContent.children[index].active = false;
                    // this.afterContent.removeChild(index);
                    // this.updateTaskContent(type);
                    break;
                case 2:
                    PlanContext.nightTaskList.splice(index, 1);
                    this.afterContent.children[index].active = false;
                    // this.nightContent.removeChild(index);
                    // this.updateTaskContent(type);
                    break;
            }
            this.alertDeleteTaskView.active = false;
        });
    }
}
