"use client"

import * as React from "react"
import { Cell, Grid } from "@hanzo/ui/grid"
import { Bot, MessageSquare, Settings, Sparkles, User } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"
import { Badge } from "@/registry/default/ui/badge"
import { Button } from "@/registry/default/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"
import { ScrollArea } from "@/registry/default/ui/scroll-area"
import { Separator } from "@/registry/default/ui/separator"
import { Textarea } from "@/registry/default/ui/textarea"

export interface AIAssistantProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onError"
> {
  provider?: string
  model?: string
  apiKey?: string
  systemPrompt?: string
  tools?: Array<{ name: string; description: string; parameters?: any }>
  onResponse?: (response: any) => void
  onError?: (error: Error) => void
  messages?: Array<{
    id: string
    role: "user" | "assistant" | "system"
    content: string
    timestamp: Date
  }>
  onSendMessage?: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  showAvatar?: boolean
  showTimestamp?: boolean
}

const AIAssistant = React.forwardRef<HTMLDivElement, AIAssistantProps>(
  (
    {
      className,
      children,
      provider = "openai",
      model = "gpt-4",
      apiKey,
      systemPrompt,
      onResponse,
      onError,
      messages = [],
      onSendMessage,
      isLoading = false,
      placeholder = "Ask the AI assistant anything...",
      showAvatar = true,
      showTimestamp = true,
      tools = [],
      ...props
    },
    ref
  ) => {
    const [input, setInput] = React.useState("")
    const scrollRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [messages])

    const handleSend = () => {
      if (!input.trim() || isLoading) return
      onSendMessage?.(input)
      setInput("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }

    return (
      // Header, transcript, composer: three rows, the middle one taking the
      // slack. The transcript scrolls because the 1fr track bounds it, which a
      // column of flex children only does once every one of them agrees to
      // shrink.
      <Grid
        ref={ref}
        columns={1}
        rows="auto minmax(0, 1fr) auto"
        gap={0}
        className={className}
        style={{ height: "100%", width: "100%" }}
        {...props}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                {provider} • {model}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tools.length > 0 && (
              <Badge variant="secondary">{tools.length} tools</Badge>
            )}
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea ref={scrollRef} className="p-4">
          <Grid columns={1} gap={16}>
            {messages.length === 0 ? (
              <Grid
                columns={1}
                gap={16}
                className="py-8 text-center"
                style={{ justifyItems: "center" }}
              >
                <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                <div>
                  <h4 className="text-lg font-medium text-muted-foreground">
                    Start a conversation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything and I&apos;ll do my best to help!
                  </p>
                </div>
              </Grid>
            ) : (
              messages.map((message) => {
                const mine = message.role === "user"
                // The avatar track is content-sized and the bubble track takes
                // the rest; which side each sits on is a placement, so the two
                // sides read the same way instead of one being a reversal of
                // the other.
                return (
                  <Grid
                    key={message.id}
                    columns={
                      mine ? "minmax(0, 1fr) auto" : "auto minmax(0, 1fr)"
                    }
                    gap={12}
                  >
                    {showAvatar && (
                      <Cell col={mine ? 2 : 1}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {mine ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </Cell>
                    )}
                    <Cell col={mine ? 1 : 2}>
                      <Grid
                        columns={1}
                        gap={4}
                        className="max-w-[80%]"
                        style={{
                          justifyItems: mine ? "end" : "start",
                          marginLeft: mine ? "auto" : undefined,
                        }}
                      >
                        {showTimestamp && (
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        )}
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                            mine
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {message.content}
                        </div>
                      </Grid>
                    </Cell>
                  </Grid>
                )
              })
            )}
            {isLoading && (
              <Grid columns="auto minmax(0, 1fr)" gap={12}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted w-fit rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </ScrollArea>

        <div className="border-t p-4">
          <Grid columns="minmax(0, 1fr) auto" gap={8}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              className="min-h-[60px] resize-none"
              rows={2}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </Grid>
        </div>

        {children}
      </Grid>
    )
  }
)
AIAssistant.displayName = "AIAssistant"

export { AIAssistant }
