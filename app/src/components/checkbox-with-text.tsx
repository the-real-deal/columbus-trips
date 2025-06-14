import { Checkbox } from "./ui/checkbox"

type CheckBoxWithTextProps = {
    title: string;
    description: string;
    onCheckedChange: () => void;
}

export default function CheckBoxWithText({ title, description, onCheckedChange }: CheckBoxWithTextProps) {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox onCheckedChange={onCheckedChange} id={title + description} />
            <div className="grid gap-1.5 leading-none">
            <label
                htmlFor={title + description}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                { title }
            </label>
            <p className="text-sm text-muted-foreground">
                { description }
            </p>
            </div>
        </div>
    )
}