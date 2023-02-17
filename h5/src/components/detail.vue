<template>
    <div class="card-container">
        <van-tabs v-model:active="active" type="card" @click-tab="onHandleTab">
            <van-tab title="设备属性">
                <template #default>
                    <div class="main-container">
                        <van-cell title="设备ID">
                            <template #value>
                                {{devInfo.deviceId}}
                            </template>
                        </van-cell>
                        <van-cell title="设备名称">
                            <template #value>
                                {{devInfo.deviceName}}
                            </template>
                        </van-cell>
                        <van-cell title="设备productcode">
                            <template #value>
                                {{devInfo.productCodeT}}
                            </template>
                        </van-cell>
                        <van-cell title="设备在线状态">
                            <template #value>
                                <van-switch v-model="devInfo.online" disabled/>
                            </template>
                        </van-cell>
                        
                        <van-cell v-for="attr in attributes" :key="attr.name" :title="attr.desc" :label="attr.name">
                            <template #value>
                                {{ attr.value }}
                            </template>
                        </van-cell>
                    </div>
                </template>
            </van-tab>

            <van-tab title="设备告警">
                <template #default>
                    <div class="main-container">
                        <van-cell v-if="alarms.length > 0" v-for="alarm in alarms" :key="alarm.name" :title="alarm.desc" :label="alarm.name">
                            <template #value>
                                {{attr.value}}
                            </template>
                        </van-cell>
                        <van-empty v-if="alarms.length === 0" description="暂无告警"/>
                    </div>
                </template>
            </van-tab>

            <van-tab title="修改属性">
                <template #default>
                    <div class="main-container">

                        <van-tabs v-model:active="sidebarActive" @click-tab="onClickTab">
                            <van-tab title="单命令">
                                <template #default>
                                    <van-cell title="选择命令" is-link :value="commandRes" @click="handleCommand"/>

                                    <van-cell title="选择命令值" is-link :value="commandValueRes"  @click="handleCommandValue"/>

                                    <van-cell title="选择超时时长" is-link :value="timeoutRes" @click="handleTimeout"/>

                                    <textarea class="createArea" :value="JSON.stringify(result)"/>

                                    <div class="submit-btn">
                                        <span class="clear-btn"><van-button type="primary" @click="clearCommand">清除结果</van-button></span>
                                        <span><van-button type="primary" @click="submitCommand">发送命令</van-button></span>
                                    </div>


                                </template>

                            </van-tab>
                            <van-tab title="组命令">

                                <template #default>
                                    <van-cell title="选择命令" is-link :value="commandRes" @click="handleCommand"/>

                                    <van-cell title="选择命令值" is-link :value="commandValueRes"  @click="handleCommandValue"/>

                                    <van-cell title="选择超时时长" is-link :value="timeoutRes" @click="handleTimeout"/>

                                    <textarea class="createArea" :value="JSON.stringify(result)"/>

                                    <div class="submit-btn">
                                        <span class="clear-btn"><van-button type="primary" @click="clearCommand">清除结果</van-button></span>
                                        <span><van-button type="primary" @click="submitCommand">发送命令</van-button></span>
                                        
                                    </div>

                                </template>
                            </van-tab>
                        </van-tabs>


                        <van-popup v-model:show="commandPicker" position="bottom">
                            <van-picker
                                :columns="commandColumns"
                                @confirm="onCommandConfirm"
                                @cancel="onCommandCancel"
                            />
                        </van-popup>

                        <van-popup v-model:show="commandValuePicker" position="bottom">
                            <van-picker
                                :columns="commandValueColums"
                                @confirm="onCommandValueConfirm"
                                @cancel="onCommandValueCancel"
                            />
                        </van-popup>

                        <van-popup v-model:show="timeoutPicker" position="bottom">
                            <van-picker
                                :columns="timeoutColums"
                                @confirm="onTimeoutConfirm"
                                @cancel="onTimeoutCancel"
                            />
                        </van-popup>

                    </div>
                </template>

            </van-tab>
        </van-tabs>

    </div>

</template>

<script>
import { ref, toRefs, toRaw } from 'vue';
import { showNotify } from 'vant';
// import { IotSdkConst } from '../../iot-lib/iot_sdk'
export default {
    name: 'detail',

    props: {
        devInfo: Object,
        alarms: Array,
        attributes: Array
    },

    setup(props, { emit }) {

        const createValuesRange = (num) => {
            let values = [{
                text: false,
                value: 'false'
            }, {
                text: true,
                value: 'true'
            }];
            for(let i = 0; i <= num; i++) {
                values.push({
                    text: i,
                    value: i
                });
            }
            return values;
        }

        const { attributes } = toRefs(props)
        
        const commandRes = ref('')
        const commandValueRes = ref('')
        const timeoutRes = ref('15')
        const result = ref({})
        const commandColumns = ref([])
        const commandValueColums = ref(createValuesRange(30))
        const timeoutColums = ref([
            {text: 15, value: 15},
            {text: 20, value: 20},
            {text: 25, value: 25},
            {text: 30, value: 30},
            {text: 35, value: 35},
        ]);
        const active = ref(0);
        const sidebarActive = ref(0);
        const commandPicker = ref(false);
        const commandValuePicker = ref(false);
        const timeoutPicker = ref(false)


        const handleCommand = () => {
            commandPicker.value = true;
            commandColumns.value = attributes.value.map((item) => {
                return {
                    text: item.desc,
                    value: item.name
                }
            })
        }

        const handleCommandValue = () => {
            commandValuePicker.value = true;
            commandColumns.value = attributes.value.map((item) => {
                return {
                    text: item.desc,
                    value: item.name
                }
            })
        }

        const handleTimeout = () => {
            timeoutPicker.value = true

        }

        const onCommandConfirm = ({selectedOptions}) => {
            commandRes.value = selectedOptions[0]?.value
            commandPicker.value = false;
        }

        const onCommandCancel = () => {
            commandPicker.value = false
        }

        const onCommandValueConfirm = ({selectedOptions}) => {
            if (!commandRes.value) {
                showNotify({type: 'warning', message: '请先选择命令'});
                commandValuePicker.value = false
                return;
            }
            commandValueRes.value = selectedOptions[0]?.value
            commandValuePicker.value = false


            if (sidebarActive.value) { // 组命令

                Object.assign(result.value, {
                    [commandRes.value] : commandValueRes.value
                })

            } else { // 单命令

                result.value = {
                    name: commandRes.value,
                    value: commandValueRes.value
                }
            }
            
        }

        const onCommandValueCancel = () => {
            commandValuePicker.value = false
        }

        const onTimeoutConfirm = ({selectedOptions}) => {
            timeoutRes.value = selectedOptions[0]?.value
            timeoutPicker.value = false
        }

        const onTimeoutCancel = () => {
            timeoutPicker.value = false
        }

        const clearCommand = () => {
            commandRes.value = '';
            commandValueRes.value = '';
            timeoutRes.value = 15;
            result.value = {}
        }

        const submitCommand = () => {

            let res = {}

            // if (sidebarActive.value) { // 组命令

            //     res.data = IotSdkConst.createGroupCmd(toRaw(result.value))

            // } else { // 单命令

            //     let rawRes = toRaw(result.value)
            //     res.data = [IotSdkConst.createSingleCmd(rawRes.name, rawRes.value)]
            // }

            res.timeout = toRaw(timeoutRes.value)

            // 区分发送是单命令还是组命令
            res.type = toRaw(sidebarActive.value)
            
            emit('onSubmitCommand', res)
        }

        const onClickTab = () => {
            clearCommand()
        }

        const onHandleTab = () => {
            clearCommand()
        }

        return {
            commandPicker,
            commandValuePicker,
            timeoutPicker,
            commandColumns,
            commandValueColums,
            timeoutColums,
            handleCommand,
            handleCommandValue,
            handleTimeout,
            onCommandConfirm,
            onCommandCancel,
            onCommandValueConfirm,
            onCommandValueCancel,
            onTimeoutConfirm,
            onTimeoutCancel,
            commandRes,
            commandValueRes,
            timeoutRes,
            clearCommand,
            submitCommand,
            onClickTab,
            onHandleTab,
            result,
            props,
            active,
            sidebarActive
        }
    },

}
</script>

<style scoped lang="less">
    .card-container {
        margin: 5px 10px;

        .main-container {

            margin-top: 20px;
        }

        .createArea {
            margin-top: 20px;
            width: 100%;
            height: 100px;
        }

        .submit-btn {
            display: flex;
            justify-content: center;
            margin-top: 20px;

            .clear-btn {
                margin-right: 20px;
            }

        }


    }
</style>