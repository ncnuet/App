import { CustomFlowbiteTheme, ToggleSwitch } from "flowbite-react";
import { useState } from "react";

interface IProps {
    name: string;
}

const customeTheme: CustomFlowbiteTheme['toggleSwitch'] = {
    "toggle": {
        "base": "toggle-bg rounded-full border group-focus:ring-4 group-focus:ring-yellow-500/25"
    }
}

export default function AuthSwitch(props: IProps) {
    const [switch3, setSwitch3] = useState(true);
    return (
        <ToggleSwitch
            label="Ghi nhớ đăng nhập"
            name={props.name}
            checked={switch3}
            color="yellow"
            sizing="sm"
            theme={customeTheme}
            onChange={setSwitch3} />
    )
}