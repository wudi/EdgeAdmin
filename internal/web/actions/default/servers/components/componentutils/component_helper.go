package componentutils

import (
	"github.com/iwind/TeaGo/actions"
	"github.com/iwind/TeaGo/maps"
	"net/http"
)

type ComponentHelper struct {
}

func NewComponentHelper() *ComponentHelper {
	return &ComponentHelper{}
}

func (this *ComponentHelper) BeforeAction(action *actions.ActionObject) {
	if action.Request.Method != http.MethodGet {
		return
	}
	action.Data["teaMenu"] = "servers"
	action.Data["teaSubMenu"] = "components"
	action.Data["mainTab"] = "component"

	// 创建左侧菜单
	secondMenuItem := action.Data.GetString("secondMenuItem")
	action.Data["leftMenuItems"] = this.createLeftMenus(secondMenuItem)
}

func (this *ComponentHelper) createLeftMenus(secondMenuItem string) (items []maps.Map) {
	items = append(items, maps.Map{
		"name":     "通用设置",
		"url":      "/servers/components",
		"isActive": secondMenuItem == "global",
	})
	items = append(items, maps.Map{
		"name":     "服务分组",
		"url":      "/servers/components/groups",
		"isActive": secondMenuItem == "group",
	})
	items = append(items, maps.Map{
		"name":     "缓存策略",
		"url":      "/servers/components/cache",
		"isActive": secondMenuItem == "cache",
	})
	items = append(items, maps.Map{
		"name":     "WAF策略",
		"url":      "/servers/components/waf",
		"isActive": secondMenuItem == "waf",
	})
	items = append(items, maps.Map{
		"name":     "日志策略",
		"url":      "/servers/components/log",
		"isActive": secondMenuItem == "log",
	})
	items = append(items, maps.Map{
		"name":     "SSL证书管理",
		"url":      "/servers/components/ssl",
		"isActive": secondMenuItem == "ssl",
	})
	items = append(items, maps.Map{
		"name":     "IP库",
		"url":      "/servers/components/ip-library",
		"isActive": secondMenuItem == "ip-library",
	})
	/**items = append(items, maps.Map{
		"name":     "Gzip规则",
		"url":      "/servers/components/gzip",
		"isActive": secondMenuItem == "gzip",
	})
	items = append(items, maps.Map{
		"name":   "路径规则",
		"url":    "/servers/components/location",
		"isActive": secondMenuItem == "location",
	})
	items = append(items, maps.Map{
		"name":   "重写规则",
		"url":    "/servers/components/rewrite",
		"isActive": secondMenuItem == "write",
	})
	items = append(items, maps.Map{
		"name":   "源站",
		"url":    "/servers/components/origin",
		"isActive": secondMenuItem == "origin",
	})
	items = append(items, maps.Map{
		"name":     "变量",
		"url":      "/servers/components/variable",
		"isActive": secondMenuItem == "variable",
	})**/

	return
}
