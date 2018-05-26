import {IPlanModel} from "./Model/IPlanModel";
import {PlanValue} from "./Model/PlanValue";

const {ccclass} = cc._decorator;

@ccclass
export class PlanContext {

    public static localPlans: Array<IPlanModel> = [];

    public static init()
    {
        this.getlocalPlanData();
    }

    // 读取本地数据
    public static getlocalData(key)
    {
        let value = cc.sys.localStorage.getItem(key);
        if (value)
        {
            return value;
        }
        return false;
    }

    // 存入本地数据
    public static savelocalData(key, value)
    {
        try {
            cc.sys.localStorage.setItem(key, value);
        }
        catch (e) {
            console.log('savelocalData fail, ex = ', e);
        }
    }

    public static getlocalPlanData()
    {
        let res = this.getlocalData('singlePlan');
        console.log('getlocalPlanData = ', res);
        if (res)
        {
            this.localPlans = res;
        }
    }

    public static savelocalPlanData(plan: IPlanModel)
    {
        console.log('保存计划的数值 = ', plan);
        this.savelocalData('singlePlan', JSON.stringify(plan));
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {}

    // update (dt) {}
}