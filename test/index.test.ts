import { join } from "path";
import { importConfig } from "../src";

const expectConfig: any = {
    app: {
        locale: "zh-CN",
        name: "website",
        timezone: "Asia/Shanghai",
        url: "http://localhost",
    },
    datebase: {
        host: "127.0.0.1",
        name: "test",
        pass: "root",
        user: "root",
    },
};

describe("导入配置", () => {
    it("导入配置应该要和预期一样", () => {
        const config = importConfig(join(process.cwd(), "/test/config"));
        expect(config).toEqual(expectConfig);
    });

    it("导入多个配置，后面的配置应该会覆盖前面的配置", () => {
        const expectConfig2 = { ...expectConfig };
        expectConfig2.app.name = "website2";
        expectConfig2.datebase.port = 3306;

        const config = importConfig(join(process.cwd(), "/test/config"), join(process.cwd(), "/test/config2"));
        expect(config).toEqual(expectConfig);
    });

    it("传入一个不存在的路径应该没有返回值", () => {
        const config = importConfig(join(process.cwd(), "/test/undefined"));
        expect(config).toBeUndefined();
    });
});
