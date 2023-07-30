'use client';

import {Rubik} from 'next/font/google'

import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"

import React, {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {DragEndEvent} from "@dnd-kit/core/dist/types";
import Image from "next/image";
import {cn} from "@/lib/utils";
import * as z from "zod";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import Select from "react-select";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import useLocalStorage from "@/hooks/useLocalStorage";

const name = 'Stan';

interface Task {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

const tasksConst: Task[] = [
  {
    id: '0',
    title: 'Complete me',
    content: 'Click the checkbox to complete this task',
    tags: ['Tech']
  },
  {
    id: '1',
    title: 'Design sign up flow',
    content: 'By the time, a prospect arrives at your signup page, they\'ve already evaluated',
    tags: ['Design']
  },
  {
    id: '2',
    title: 'Landing page content',
    content: 'Write the content of the new page and prepare the assets for the different section',
    tags: ['Marketing']
  },
  {
    id: '3',
    title: 'Design use case page',
    content: '',
    tags: ['Design']
  }, {
    id: '4',
    title: 'Design a tool for the metrics',
    content: 'I\'m currently working on improving some components in the design system. Here is a "task management" page I\'ve been working on lately, this one will be available very soon in the design system',
    tags: ['Metrics']
  },
]

const rubik = Rubik({subsets: ['latin']})

export default function TaskPage() {
  const [tasksLocalStorage, setTasksLocalStorage] = useLocalStorage('tasks', JSON.stringify(tasksConst));
  const [tasks, setTasks] = useState(JSON.parse(tasksLocalStorage))

  return (
    <div className={cn("p-10 sm:p-0 flex flex-col h-screen overflow-hidden items-center pt-5", rubik.className)}>
      <div className="absolute right-5 bottom-5">
        <Button
          className="bg-[#ebdaff] opacity-50 text-[#7D55CC] text-[22px] py-2 px-2 font-normal hover:bg-[#ebdaff] hover:text-white"
          onClick={() => {
            // TODO duplicated
            setTasks(tasksConst);
            setTasksLocalStorage(JSON.stringify(tasksConst));
          }}>Reset</Button>
      </div>
      <Image
        src="/todo.png"
        alt="Task Management"
        width={100}
        height={100}
        priority
      />

      <div className="p-2"></div>
      <div className="sm:w-[80%] md:w-[70%] lg:w-[60%]">
        <div className="flex flex-col items-center">
          <h1 className="text-[30px] font-bold text-[#211C2B]">Welcome back, {name}</h1>
          <h1 className="text-[20px] font-light text-[#A3A3A3] mt-1">You've got {tasks.length} tasks coming up in the
            next
            days</h1>

          <div className="p-3"></div>
          <div className="w-full flex place-content-between">
            <div className="hack"></div>
            <div className="hack"></div>
            <div className="hack"></div>
            <div className="hack"></div>
            <div className="hack"></div>
            <div className="hack"></div>

            <div className="">
              <Nav/>
            </div>

            <div className="hack"></div>
            <div className="hack"></div>
            <div className="hack"></div>

            <AddDialog onSuccess={val => {
              // TODO extract
              val.id = (Math.random() + 1).toString(36).substring(7);
              var tasksUpdated: Task[] = [val, ...tasks];
              setTasks(tasksUpdated);
              setTasksLocalStorage(JSON.stringify(tasksUpdated));
            }}/>
          </div>

          <div className="p-3"></div>

          <div className="bg-gray-100 w-full rounded-2xl">
            <TaskList tasks={tasks} setTasks={setTasks} setTasksLocalStorage={setTasksLocalStorage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title may not be empty",
  }),
  content: z.string(),
  tags: z.string().array()
})

interface AddDialogProps {
  onSuccess: (any) => any
}

function AddDialog({onSuccess}: AddDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"
                className="bg-[#E2D6FA] text-[#7D55CC] text-[22px] py-5 px-5 font-normal hover:bg-[#7A55CC] hover:text-white">
          + Task</Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", rubik.className)}>
        <DialogHeader>
          <DialogTitle className=" text-[28px] font-bold">New Task</DialogTitle>
          <DialogDescription>
            Fill in the form
          </DialogDescription>
        </DialogHeader>

        <TableForm onResult={(val) => {
          setOpen(false);
          onSuccess(val);
        }}/>

      </DialogContent>
    </Dialog>
  )
}

const tags = [
  {label: "Design", value: "Design"},
  {label: "Art", value: "Art"},
  {label: "Engineering", value: "Engineering"},
  {label: "Lifestyle", value: "Lifestyle"},
  {label: "Chess", value: "Chess"},
];

interface TableFormProps {
  onResult: (any) => any
}

function TableForm({onResult}: TableFormProps) {
  const methods = useForm()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onResult(values);
  }

  // todo error is not shown for missing title
  return (
    <FormProvider {...methods}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-3 py-2">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Item"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} placeholder="Great and important stuff"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormLabel>Tags</FormLabel>
            <Controller
              name="tags"
              control={form.control}
              render={({field: {onChange, value, ref}}) => (
                <Select
                  ref={ref}
                  isMulti
                  options={tags}
                  value={tags.filter((c) => value.includes(c.value))}
                  onChange={(val) => onChange(val.map(c => c.value))}
                />
              )}
              rules={{required: true}}
            />
          </div>
        </div>

        <Button type="submit" variant="outline"
                className="bg-[#E2D6FA] text-[#7D55CC] text-[18px] py-5 px-5 font-normal hover:bg-[#7A55CC] hover:text-white">
          Save changes
        </Button>
      </form>
    </FormProvider>
  )
}

function Nav() {
  return (
    <div className="flex flex-1">
      <p className="pr-6 text-[22px] text-[#7D55CC] underline underline-offset-2 p-1 cursor-pointer">Active</p>
      <div
        className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="pl-6 text-[22px] text-[#C3C3C3] hover:text-[#d3d3d3] p-1 cursor-pointer">Archive</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Under construction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

// https://docs.dndkit.com/presets/sortable
interface TaskListProps {
  tasks: Task[],
  setTasks: (value: (((prevState: Task[]) => Task[]) | Task[])) => void,
  setTasksLocalStorage: (value: any) => void
}

function TaskList({tasks, setTasks, setTasksLocalStorage}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 12,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [animationParent, enableAnimations] = useAutoAnimate();

  return (
    <div className="sticky h-[calc(100vh-20rem)] overflow-y-scroll overscroll-contain">
      <div className="p-10">
        <DndContext sensors={sensors} onDragStart={() => enableAnimations(false)} onDragEnd={(event) => {
          handleDragEnd(event);
          setTimeout(function () {
            enableAnimations(true);
          }, 100);
        }}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div className="space-y-4" ref={animationParent}>
              {tasks.map(task => <Task key={task.id} task={task} onRemove={() => {
                var tasksUpdated = tasks.filter(t => t.id != task.id);
                setTasks(tasksUpdated);
                setTasksLocalStorage(JSON.stringify(tasksUpdated));
              }}/>)}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        const moved = arrayMove(items, oldIndex, newIndex);
        setTasksLocalStorage(JSON.stringify(moved));
        return moved;
      });
    }
  }
}

function Task({task, onRemove}: {
  task: Task,
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: task.id});

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Card className="flex bg-white p-4 rounded-xl" key={task.id} ref={setNodeRef}
          style={style} {...attributes} {...listeners}>
      <Checkbox className="mr-4 mt-1" onCheckedChange={(event) => {
        onRemove()
      }}/>
      <div className="overflow-hidden truncate-ellipsis">
        <h1 className="text-[22px] pb-2 text-[#211C2B]">{task.title}</h1>
        <p className="text-gray-500">{task.content}</p>

        {task.tags.map(tag =>
          <Badge key={tag} variant="outline" className="mt-2 mr-2">
            <div className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>
              </svg>
            </div>
            {tag}
          </Badge>
        )}

      </div>
    </Card>
  )
}

