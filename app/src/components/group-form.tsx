import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GroupForm() {
    const [groupType, setGroupType] = useState("PRIVATE")
    const [groupImage, setGroupImage] = useState<File | null>(null)
    const [usernameQuery, setUsernameQuery] = useState("")

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setGroupImage(e.target.files[0])
        }
    }

    return (
        <Card className="max-w-xl mx-auto mt-6">
            <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input id="group-name" placeholder="Enter group name" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="group-description">Description</Label>
                    <Textarea id="group-description" placeholder="Brief description" />
                </div>

                <div className="space-y-2 flex">
                    <div>
                        <Label className="py-2" htmlFor="group-image">Group Picture (optional)</Label>
                        <Input id="group-image" type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    {groupImage && (
                        <Avatar className="w-32 h-32 mt-2 ms-auto">
                            <AvatarImage src={URL.createObjectURL(groupImage)} alt="Group" />
                        </Avatar>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Group Type</Label>
                    <RadioGroup defaultValue={groupType} onValueChange={setGroupType} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="PRIVATE" id="private" />
                            <Label htmlFor="private">Private</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="PUBLIC" id="public" />
                            <Label htmlFor="public">Public</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="INVITE-ONLY" id="invite-only" />
                            <Label htmlFor="invite-only">Invite Only</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="search-user">Add People</Label>
                    <Input
                        id="search-user"
                        placeholder="Search by username"
                        value={usernameQuery}
                        onChange={(e) => setUsernameQuery(e.target.value)}
                    />
                    {/* Here you can render filtered users based on usernameQuery */}
                    <ScrollArea className="h-32 border rounded-md mt-2 p-2">
                        {/* Replace with user search result mock */}
                        <div className="text-sm text-muted-foreground">No results</div>
                    </ScrollArea>
                </div>

                <Button className="w-full mt-4">Create Group</Button>
            </CardContent>
        </Card>
    )
}
