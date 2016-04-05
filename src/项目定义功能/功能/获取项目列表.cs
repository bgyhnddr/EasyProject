using System;
using System.IO;
using System.Web;
using System.Linq;

namespace 项目定义功能.功能
{
    public class 获取项目列表
    {
        public 获取项目列表()
        {
        }

        public 项目名称类[] Exec()
        {
            var path = HttpContext.Current.Server.MapPath("~/项目");

            if (!Directory.Exists(path))
            {
                // Create the directory it does not exist.
                Directory.CreateDirectory(path);
            }

            return Directory.GetDirectories(path).Select(o => new 项目名称类() { 名称 = o.Substring(o.LastIndexOf("\\") + 1) }).ToArray();
        }
    }
}