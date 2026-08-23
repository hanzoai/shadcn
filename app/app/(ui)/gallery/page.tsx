import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H1,
  H2,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToggleGroup,
  ToggleGroupItem,
  XStack,
} from "@hanzo/ui"
import { Cell, Grid } from "@hanzo/ui/grid"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Every family @hanzo/ui exports, rendered the way a page uses it — overlays closed, behind their own triggers.",
}

export const dynamic = "force-static"

/**
 * The components, rendered the way a PAGE uses them.
 *
 * `@hanzo/ui/gallery` is the package's own list, and it is a harness: it renders
 * every portalled surface OPEN so their panels emit rules — measured, thirteen
 * full-viewport fixed layers, which put a modal over anything that mounts it.
 * That is right for a stylesheet generator and wrong for a reader, so the raw
 * harness lives at /gallery/live in a document of its own and this page shows
 * the same families closed, behind the triggers a caller actually writes.
 *
 * Every block below is a grid whose tracks come from the container.
 */

const BUTTONS = [
  "default",
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
  "linkFG",
  "linkMuted",
] as const

const SIZES = ["sm", "default", "lg"] as const
const BADGES = ["default", "secondary", "destructive", "outline"] as const

function Block({
  name,
  note,
  children,
}: {
  name: string
  note: string
  children: React.ReactNode
}) {
  return (
    <Grid columns={1} gap="$3">
      <Cell>
        <Grid columns={1} gap="$1">
          <H2 fontSize="$6" lineHeight="$6" fontWeight="600" color="$color12">
            {name}
          </H2>
          <Text fontSize="$3" color="$color11">
            {note}
          </Text>
        </Grid>
      </Cell>
      <Cell>{children}</Cell>
    </Grid>
  )
}

/** A run of small things that each size to their own content — flexbox's case. */
function Run({ children }: { children: React.ReactNode }) {
  return (
    <XStack gap="$3" alignItems="center" flexWrap="wrap">
      {children}
    </XStack>
  )
}

export default function GalleryPage() {
  return (
    <Grid columns={1} gap="$10">
      <Cell>
        <Grid columns="minmax(0, 780px)" gap="$3">
          <H1 fontSize="$12" lineHeight="$12" fontWeight="700" color="$color12">
            Gallery
          </H1>
          <Text fontSize="$5" color="$color11">
            Every family, rendered the way a page uses it — overlays closed,
            behind their own triggers.
          </Text>
          <Text fontSize="$3" color="$color11">
            The package&apos;s own list is{" "}
            <Text fontFamily="$mono">@hanzo/ui/gallery</Text>, and it is a
            harness: it renders every portalled surface OPEN so their panels
            produce rules. That is thirteen full-viewport layers, so it runs in a
            document of its own —{" "}
            <Link href="/gallery/live" style={{ color: "inherit" }}>
              open the harness
            </Link>
            .
          </Text>
        </Grid>
      </Cell>

      <Cell>
        <Grid columns={{ min: 320 }} gap="$8">
          <Cell>
            <Block name="Button" note="Nine variants, three sizes, plus the two states that are not variants.">
              <Grid columns={1} gap="$3">
                <Run>
                  {BUTTONS.map((v) => (
                    <Button key={v} variant={v}>
                      {v}
                    </Button>
                  ))}
                </Run>
                <Run>
                  {SIZES.map((s) => (
                    <Button key={s} size={s}>
                      {s}
                    </Button>
                  ))}
                  <Button disabled>disabled</Button>
                  <Button isLoading>loading</Button>
                </Run>
              </Grid>
            </Block>
          </Cell>

          <Cell>
            <Block name="Badge" note="Four tones, one shape.">
              <Run>
                {BADGES.map((v) => (
                  <Badge key={v} variant={v}>
                    {v}
                  </Badge>
                ))}
              </Run>
            </Block>
          </Cell>

          <Cell>
            <Block name="Card" note="Header, content, footer — each optional, none pinned to a height.">
              <Card>
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>Card description</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text color="$color12">
                    Content grows down its track and takes the width it is
                    given.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">
                    Footer action
                  </Button>
                </CardFooter>
              </Card>
            </Block>
          </Cell>

          <Cell>
            <Block name="Fields" note="Behaviour comes from the matching gui primitive; nothing here reimplements focus or keyboard.">
              <Grid columns={1} gap="$3">
                <Grid columns={1} gap="$1">
                  <Label>Email</Label>
                  <Input placeholder="name@hanzo.ai" />
                </Grid>
                <Input type="password" placeholder="Password" />
                <Textarea placeholder="Textarea" />
                <Run>
                  <Checkbox />
                  <Switch />
                  <Spinner />
                </Run>
                <Slider defaultValue={[40]} max={100} />
                <Progress value={62} />
                <RadioGroup defaultValue="a">
                  <Run>
                    <RadioGroupItem value="a" />
                    <RadioGroupItem value="b" />
                  </Run>
                </RadioGroup>
              </Grid>
            </Block>
          </Cell>

          <Cell>
            <Block name="Select" note="A listbox, closed until asked.">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Alpha</SelectItem>
                  <SelectItem value="b">Beta</SelectItem>
                  <SelectItem value="c">Gamma</SelectItem>
                </SelectContent>
              </Select>
            </Block>
          </Cell>

          <Cell>
            <Block name="Tabs" note="One panel at a time, keyboard-navigable.">
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one">One</TabsTrigger>
                  <TabsTrigger value="two">Two</TabsTrigger>
                </TabsList>
                <TabsContent value="one">
                  <Text color="$color11">The first panel.</Text>
                </TabsContent>
                <TabsContent value="two">
                  <Text color="$color11">The second panel.</Text>
                </TabsContent>
              </Tabs>
            </Block>
          </Cell>

          <Cell>
            <Block name="Accordion" note="Disclosure down the page.">
              <Accordion type="single" collapsible>
                <AccordionItem value="a">
                  <AccordionTrigger>What is the substrate?</AccordionTrigger>
                  <AccordionContent>
                    @hanzo/gui, on the @hanzo/tokens scale.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Where does Grid live?</AccordionTrigger>
                  <AccordionContent>
                    @hanzo/ui/grid — web-only, so off the barrel.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Block>
          </Cell>

          <Cell>
            <Block name="Collapsible" note="The same disclosure, without the set.">
              <Collapsible>
                <CollapsibleTrigger>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Text color="$color11">Revealed.</Text>
                </CollapsibleContent>
              </Collapsible>
            </Block>
          </Cell>

          <Cell>
            <Block name="Overlays" note="Each behind the trigger a caller writes — this is the difference between this page and the harness.">
              <Run>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline">Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>A dialog</DialogTitle>
                      <DialogDescription>
                        Portalled, focus-trapped, dismissible.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button size="sm">Done</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="outline">Alert</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this?</AlertDialogTitle>
                      <AlertDialogDescription>
                        It removes every run recorded against it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline">Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Text color="$color12">Anchored to its trigger.</Text>
                  </PopoverContent>
                </Popover>

                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="outline">Hover card</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Text color="$color12">Opens on hover.</Text>
                  </HoverCardContent>
                </HoverCard>

                <TooltipProvider delay={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline">Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>A tooltip</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Run>
            </Block>
          </Cell>

          <Cell>
            <Block name="Toggle group" note="A set where one is on.">
              <ToggleGroup type="single" defaultValue="a">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
              </ToggleGroup>
            </Block>
          </Cell>

          <Cell>
            <Block name="Avatar, Separator, Aspect ratio" note="The small ones.">
              <Grid columns={1} gap="$3">
                <Run>
                  <Avatar>
                    <AvatarFallback>HZ</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </Run>
                <Separator />
                <AspectRatio ratio={16 / 9}>
                  <Grid
                    columns={1}
                    gap={0}
                    style={{
                      height: "100%",
                      alignContent: "center",
                      justifyItems: "center",
                      background: "var(--muted, rgb(255 255 255 / .06))",
                      borderRadius: 8,
                    }}
                  >
                    <Text fontFamily="$mono" fontSize="$2" color="$color11">
                      16 / 9
                    </Text>
                  </Grid>
                </AspectRatio>
              </Grid>
            </Block>
          </Cell>

          <Cell>
            <Block name="Scroll area" note="A frame that scrolls its own content instead of the page.">
              <ScrollArea style={{ height: 140 }}>
                <Grid columns={1} gap="$2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <Text key={i} color="$color11">
                      Row {i + 1}
                    </Text>
                  ))}
                </Grid>
              </ScrollArea>
            </Block>
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  )
}
