// @hanzo/shadcn — the shadcn-compatible React surface.
//
// Radix primitives for behaviour (a11y, portalling, keyboard) styled entirely
// with the STANDARD shadcn design tokens (`bg-popover`, `border-border`,
// `bg-primary`, `text-muted-foreground`, …) — no app-private token names. The
// package ships no CSS of its own: it renders against whatever host defines
// those variables, which every shadcn app already does. Fonts are inherited or
// bound to `font-sans`/`font-mono`; nothing here hard-codes a family.
//
// This barrel is the whole package. There are no per-component subpaths — the
// build is ESM with `sideEffects: false`, so importing one name from the barrel
// tree-shakes to one component. One door, not eighty-nine.

export { cn } from './utils'
export { AspectRatio } from './aspect-ratio'
export { Avatar, AvatarImage, AvatarFallback } from './avatar'
export { Badge, badgeVariants } from './badge'
export { Button, buttonVariants, type ButtonProps } from './button'
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from './card'
export { Checkbox } from './checkbox'
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './dialog'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'
export { Input, type InputProps } from './input'
export { Label } from './label'
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover'
export { Progress } from './progress'
export { ScrollArea, ScrollBar } from './scroll-area'
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select'
export { Separator } from './separator'
export { Slider } from './slider'
export { Switch } from './switch'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
export { Textarea } from './textarea'
export { Toaster, toast } from './toaster'
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'
