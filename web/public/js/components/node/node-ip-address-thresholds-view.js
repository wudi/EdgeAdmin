// 节点IP阈值
Vue.component("node-ip-address-thresholds-view", {
	props: ["v-thresholds"],
	data: function () {
		let thresholds = this.vThresholds
		if (thresholds == null) {
			thresholds = []
		} else {
			thresholds.forEach(function (v) {
				if (v.items == null) {
					v.items = []
				}
				if (v.actions == null) {
					v.actions = []
				}
			})
		}

		return {
			thresholds: thresholds,
			allItems: window.IP_ADDR_THRESHOLD_ITEMS,
			allOperators: [
				{
					"name": "小于等于",
					"code": "lte"
				},
				{
					"name": "大于",
					"code": "gt"
				},
				{
					"name": "不等于",
					"code": "neq"
				},
				{
					"name": "小于",
					"code": "lt"
				},
				{
					"name": "大于等于",
					"code": "gte"
				}
			],
			allActions: [
				{
					"name": "上线",
					"code": "up",
					"description": "上线当前IP。"
				},
				{
					"name": "下线",
					"code": "down",
					"description": "下线当前IP。"
				},
				{
					"name": "通知",
					"code": "notify",
					"description": "发送已达到阈值通知。"
				}
			]
		}
	},
	methods: {
		itemName: function (item) {
			let result = ""
			this.allItems.forEach(function (v) {
				if (v.code == item) {
					result = v.name
				}
			})
			return result
		},
		itemUnitName: function (itemCode) {
			let result = ""
			this.allItems.forEach(function (v) {
				if (v.code == itemCode) {
					result = v.unit
				}
			})
			return result
		},
		itemDurationUnitName: function (unit) {
			switch (unit) {
				case "minute":
					return "分钟"
				case "second":
					return "秒"
				case "hour":
					return "小时"
				case "day":
					return "天"
			}
			return unit
		},
		itemOperatorName: function (operator) {
			let result = ""
			this.allOperators.forEach(function (v) {
				if (v.code == operator) {
					result = v.name
				}
			})
			return result
		},
		actionName: function (actionCode) {
			let result = ""
			this.allActions.forEach(function (v) {
				if (v.code == actionCode) {
					result = v.name
				}
			})
			return result
		}
	},
	template: `<div>
	<!-- 已有条件 -->
	<div v-if="thresholds.length > 0">
		<div class="ui label basic small" v-for="(threshold, index) in thresholds" style="margin-bottom: 0.5em">
			<span v-for="(item, itemIndex) in threshold.items">[{{item.duration}}{{itemDurationUnitName(item.durationUnit)}}] {{itemName(item.item)}}
			  <!-- 连通性 -->
			<span v-if="item.item == 'connectivity' && item.options != null && item.options.groups != null && item.options.groups.length > 0">[<span v-for="(group, groupIndex) in item.options.groups">{{group.name}} <span v-if="groupIndex != item.options.groups.length - 1">&nbsp; </span></span>]</span>
			
			 <span class="grey">[{{itemOperatorName(item.operator)}}]</span> {{item.value}}{{itemUnitName(item.item)}} &nbsp;<span v-if="itemIndex != threshold.items.length - 1" style="font-style: italic">AND &nbsp;</span></span>
			-&gt;
			<span v-for="(action, actionIndex) in threshold.actions">{{actionName(action.action)}}
			<span v-if="action.action == 'switch'">到{{action.options.ips.join(", ")}}</span>
			 &nbsp;<span v-if="actionIndex != threshold.actions.length - 1" style="font-style: italic">AND &nbsp;</span></span>
		</div>
	</div>
</div>`
})