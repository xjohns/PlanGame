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
    allTaskContent: cc.Node = null;

    // function view
    @property(cc.Label)
    infoLabel: cc.Label = null;

    @property(cc.Button)
    backButton: cc.Button = null;

    @property(cc.Button)
    sureButton: cc.Button = null;

    // delete task alert view
    @property(cc.Label)
    alertContentlabel: cc.Label = null;

    @property(cc.Button)
    alertcancelButton: cc.Button = null;

    @property(cc.Button)
    alertconfirmButton: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.infoLabel.string = '信息展示，日期、天气、心情或其他';
        this.foreAddButton.node.on('click', event1 => {
           // 弹出上午的可选任务
        });
        this.afterAddButton.node.on('click', event1 => {
            // 弹出下午的可选任务
        });
        this.nightAddButton.node.on('click', event1 => {
            // 弹出夜晚的可选任务
        });
        this.backButton.node.on('click', event1 => {
            // 返回主界面
            cc.director.loadScene('Main');
        });
        this.sureButton.node.on('click', event1 => {
            // 前往任务执行展示页面
            cc.director.loadScene('ShowPlanGame');
        });
        this.alertcancelButton.node.on('click', event1 => {
            // 取消删除当前单个任务
        });
        this.alertconfirmButton.node.on('click', event1 => {
            // 确认删除当前单个任务
        });
    }

    start () {
        this.updateTaskContent();
    }

    // update (dt) {}

    updateTaskContent(){

    }
}
