using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CypherProjectDefinition.WebService
{
    /// <summary>
    /// 代码生成功能 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class 项目定义服务 : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public string 保存项目(string args)
        {
            var 允许列表 = new List<Cypher.权限.角色类>();
            var 拒绝列表 = new List<Cypher.权限.角色类>();
            try
            {
                new 项目定义功能.功能.保存项目().Exec(基础类库.数据交换类.GetObj<项目定义功能.项目类>(args));
                return new 基础类库.数据交换类()
                {
                    success = true
                }.ToResponseString();
            }
            catch(项目定义功能.功能.保存项目.项目不是最新异常 ex)
            {
                return new 基础类库.数据交换类()
                {
                    success = false,
                    errCode = "项目不是最新异常",
                    errMsg = ex.Message,
                    stack = ex.ToString()
                }.ToResponseString();
            }
            catch (Exception ex)
            {
                return new 基础类库.数据交换类()
                {
                    success = false,
                    errCode = "-1",
                    errMsg = "发生未知异常",
                    stack = ex.ToString()
                }.ToResponseString();
            }
        }

        [WebMethod(EnableSession = true)]
        public string 获取项目(string args)
        {
            try
            {
                var data = new 项目定义功能.功能.获取项目().Exec(基础类库.数据交换类.GetObj<项目定义功能.项目名称类>(args));
                return new 基础类库.数据交换类()
                {
                    success = true,
                    data = data
                }.ToResponseString();
            }
            catch(项目定义功能.功能.获取项目.找不到项目异常 ex)
            {
                return new 基础类库.数据交换类()
                {
                    success = false,
                    data = null,
                    errCode = "找不到项目异常",
                    errMsg = ex.Message,
                    stack = ex.Message + ":" + ex.StackTrace
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
                    stack = ex.Message + ":" + ex.StackTrace
                }.ToResponseString();
            }
        }

        [WebMethod(EnableSession = true)]
        public string 获取项目列表()
        {
            try
            {
                var data = new 项目定义功能.功能.获取项目列表().Exec();
                return new 基础类库.数据交换类()
                {
                    success = true,
                    data = data
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
                    stack = ex.Message + ":" + ex.StackTrace
                }.ToResponseString();
            }
        }

        [WebMethod(EnableSession = true)]
        public string 删除项目(string args)
        {
            try
            {
                new 项目定义功能.功能.删除项目().Exec(基础类库.数据交换类.GetObj<项目定义功能.项目名称类>(args));
                return new 基础类库.数据交换类()
                {
                    success = true
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
                    stack = ex.Message + ":" + ex.StackTrace
                }.ToResponseString();
            }
        }
    }
}
