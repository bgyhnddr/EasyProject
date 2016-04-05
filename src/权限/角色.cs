using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Cypher.权限
{
    public class 角色
    {
        public static 角色类 管理员 = new 角色类()
        {
            名称 = "管理员"
        };

        public static string 获取当前角色()
        {
            if (HttpContext.Current.Session["用户"] == null)
            {
                throw new 未登录异常();
            }
            else
            {
                return ((用户)HttpContext.Current.Session["用户"]).角色;
            }
        }

        public static void 设置当前角色(string name)
        {
            HttpContext.Current.Session["角色"] = name;
        }
    }
}
