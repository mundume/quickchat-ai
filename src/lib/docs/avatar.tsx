export const name = "Avatar";
export const importDocs = `
import {Avatar, AvatarImage, AvatarFallback} from './components/ui/avatar';
`;
export const usageDocs = `
<Avatar size="medium">
  <AvatarImage source={{ uri: "https://github.com/nutlope.png" }} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
`;