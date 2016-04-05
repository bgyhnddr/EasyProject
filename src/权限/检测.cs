using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cypher.权限
{
    public class 检测
    {
        public static string 权限检测(Func<string> 委托,List<Cypher.权限.角色类> 允许列表, List<Cypher.权限.角色类> 拒绝列表)
        {
            try
            {
                if (Cypher.权限.检测.角色检查(允许列表, 拒绝列表, Cypher.权限.角色.获取当前角色()))
                {
                    return 委托.Invoke();
                }
                else
                {
                    return new 基础类库.数据交换类()
                    {
                        success = false,
                        data = null,
                        errCode = "-1",
                        errMsg = "权限不足"
                    }.ToResponseString();
                }
            }
            catch (Cypher.权限.未登录异常)
            {
                return new 基础类库.数据交换类()
                {
                    success = false,
                    data = null,
                    errCode = "not_login",
                    errMsg = "用户未登录"
                }.ToResponseString();
            }
            catch (Exception ex)
            {
                return new 基础类库.数据交换类()
                {
                    success = false,
                    data = null,
                    errCode = "-1",
                    errMsg = "发生未知错误",
                    stack = ex.ToString()
                }.ToResponseString();
            }
        }

        private static bool 允许检查(角色类 允许角色, string 当前角色)
        {
            if (允许角色.名称 == 当前角色)
            {
                return true;
            }
            else
            {
                if (允许角色.继承列表 == null)
                {
                    return false;
                }
                else
                {
                    return 允许角色.继承列表.Any(o => 允许检查(o, 当前角色));
                }
            }
        }

        private static bool 拒绝检查(角色类 允许角色, string 当前角色)
        {
            return 允许角色.名称 == 当前角色;
        }

        public static bool 角色检查(List<角色类> 允许列表, List<角色类> 拒绝列表, string 当前角色)
        {
            bool 允许, 拒绝;

            if (允许列表.Count == 0)
            {
                允许 = true;
            }
            else
            {
                允许 = 允许列表.Any(o => 允许检查(o, 当前角色));
            }

            if (拒绝列表.Count == 0)
            {
                拒绝 = false;
            }
            else
            {
                拒绝 = 拒绝列表.Any(o => 拒绝检查(o, 当前角色));
            }

            return 允许 && !拒绝;
        }
    }
}
