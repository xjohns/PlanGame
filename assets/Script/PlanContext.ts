import {IPlanModel} from "./Model/IPlanModel";
import {PlanValue} from "./Model/PlanValue";

const {ccclass} = cc._decorator;

@ccclass
export class PlanContext extends cc.Component{

    public static singlePlan: IPlanModel = {};
    public static localPlans: Array<IPlanModel> = [];
    public static planNameList: Array<string> = [];
    public static foreTaskList: Array<string> = [];
    public static afterTaskList: Array<string> = [];
    public static nightTaskList: Array<string> = [];

    onLoad()
    {
        cc.game.addPersistRootNode(this.node);
        PlanContext.init();
    }

    public static async init()
    {
        console.log('PlanContext Init');
        await this.getlocalData('planNameList');
        for (let planName of this.planNameList)
        {
            console.log('planName = ', planName);
            await this.getlocalsinglePlanData(planName);
        }
        await this.getlocalData('foreTaskList');
        await this.getlocalData('afterTaskList');
        await this.getlocalData('nightTaskList');
    }

    // 读取本地数据
    public static async getlocalData(key)
    {
        let value = await cc.sys.localStorage.getItem(key);
        console.log('getlocalData, key = ' + key + ', value = ' + value);
        if (value)
        {
            return value;
        }
        return false;
    }

    // 存入本地数据
    public static async savelocalData(key, value)
    {
        try {
            await cc.sys.localStorage.setItem(key, value);
            console.log('savelocalData, key = ' + key + ', value = ' + value);
        }
        catch (e) {
            console.log('savelocalData fail, ex = ', e);
        }
    }

    public static async getlocalsinglePlanData(planName)
    {
        let res: IPlanModel = await this.getlocalData(planName);
        if (res)
        {
            this.singlePlan.name = res.name;
            this.singlePlan.wisdomEffect = res.wisdomEffect;
            this.singlePlan.healthEffect = res.healthEffect;
            this.singlePlan.funEffect = res.funEffect;
            this.singlePlan.timeSpend = res.timeSpend;
            console.log('localPlans = ', this.localPlans);
            this.localPlans.push(this.singlePlan);
        }
    }

    public static async savelocalSinglePlanData(planName, singlePlan: IPlanModel)
    {
        await this.savelocalData(planName, JSON.stringify(singlePlan));
    }

    public static async loadRes(url: string, type: typeof cc.Asset): Promise<any>
    {
        return new Promise<object>(function (resolve, reject)
        {
            cc.loader.loadRes(url, type, function (err, res)
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(res);
                }
            });
        });
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {}

    // update (dt) {}
}