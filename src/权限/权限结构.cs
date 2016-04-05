using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cypher.权限
{
    public class 用户
    {
        public string 名称;
        public string 角色;
    }

    public class 角色类
    {
        public string 名称;
        public 角色类[] 继承列表;
    }
}
