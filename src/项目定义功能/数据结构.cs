namespace 项目定义功能
{
    /// <summary>
    /// 项目定义的类
    /// </summary>
    public class 项目类
    {
        public string 项目名称 { get; set; }
        public 角色类[] 角色列表 { get; set; }
        public 服务类[] 服务列表 { get; set; }
        public string 描述 { get; set; }
        public string tick { get; set; }
    }

    /// <summary>
    /// 角色类
    /// </summary>
    public class 角色类
    {
        public string 名称 { get; set; }
        /// <summary>
        /// 继承的角色，内容为角色名称的列表
        /// </summary>
        public string[] 继承 { get; set; }
        public string 描述 { get; set; }
    }

    /// <summary>
    /// 描述一套服务的类
    /// </summary>
    public class 服务类
    {
        public string 名称 { get; set; }
        public 数据结构类[] 数据结构列表 { get; set; }
        public 功能类[] 功能列表 { get; set; }
        public string 描述 { get; set; }
    }

    public class 数据结构类
    {
        public string 名称 { get; set; }
        public 字段类[] 字段列表 { get; set; }
        /// <summary>
        /// 指定数据结构是否为数组,默认为false
        /// </summary>
        public string 描述 { get; set; }
    }

    public class 字段类
    {
        public string 名称 { get; set; }
        /// <summary>
        /// 定义字段的类型，可以是系统本身的类型或者自定义的“结构”
        /// </summary>
        public 字段类型 类型 { get; set; }
        /// <summary>
        /// 当字段类型为“结构”或“枚举”时，所选用的数据结构名称;
        /// </summary>
        public string 结构 { get; set; }
        /// <summary>
        /// 指定字段是否为数组
        /// </summary>
        public bool 数组 { get; set; }
        public string 描述 { get; set; }
    }

    public class 功能类
    {
        public string 名称 { get; set; }
        public 输入输出类 输入 { get; set; }
        public 输入输出类 输出 { get; set; }
        public 异常类[] 异常列表 { get; set; }
        public 权限类 权限列表 { get; set; }
        public string 描述 { get; set; }
    }

    public class 输入输出类
    {
        public string 数据结构 { get; set; }
        public bool 数组 { get; set; }
        public string 描述 { get; set; }
    }

    public class 异常类
    {
        public string 名称 { get; set; }
        public string 描述 { get; set; }
    }

    public class 权限类
    {
        public string[] 允许角色列表 { get; set; }
        public string[] 拒绝角色列表 { get; set; }
    }

    public class 项目名称类
    {
        public string 名称;
    }
}
