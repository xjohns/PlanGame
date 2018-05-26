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
export class PlanValue {
    public static maxWisdom: number = 200;
    public static perWisdom: number = 0.5;
    public static maxHealth: number = 100;
    public static perHealth: number = 1;
    public static maxFun: number = 100;
    public static perFun: number = 1;
    public static maxTime: number = 6;
    public static perTime: number = 0.5;

    // LIFE-CYCLE CALLBACKS:
    // update (dt) {}
}
