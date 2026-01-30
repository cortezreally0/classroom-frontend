import React from 'react'
import {CreateView} from "@/components/refine-ui/views/create-view.tsx";
import {Breadcrumb} from "@/components/ui/breadcrumb.tsx";
import {useBack} from "@refinedev/core";
import {Separator} from "@/components/ui/separator.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "@refinedev/react-hook-form";
import {classSchema} from "@/lib/schema.ts";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Loader2} from "lucide-react";
import UploadWidget from "@/components/upload-widget.tsx";

const Create = () => {
    const back = useBack();

    const form = useForm({
        resolver: zodResolver(classSchema),
        refineCoreProps: {
            resource: "classes",
            action: "create",
        }
    })

    const {handleSubmit, formState: {isSubmitting, errors }, control} = form;

    const onSubmit = (values: z.infer<typeof classSchema>) => {
        try {
            console.log(values)
        } catch (e) {
            console.log('Error creating new instance', e);
        }
    }

    const teachers = [
        {
            id: "1",
            name: "John Doe",
        },
        {
            id: "2",
            name: "Jane Smith",
        },
        {
            id: "3",
            name: "Dr. Alan Turing",
        },
    ];

    const subjects = [
        {
            id: 1,
            name: "Mathematics",
            code: "MATH",
        },
        {
            id: 2,
            name: "Computer Science",
            code: "CS",
        },
        {
            id: 3,
            name: "Physics",
            code: "PHY",
        },
        {
            id: 4,
            name: "Chemistry",
            code: "CHEM",
        },
    ];


    const bannerPublicId = form.watch('bannerCldPubId')

    const setBannerImage = (file: any, field: any) => {
        if(file) {
            field.onChange(file.url);
            form.setValue('bannerCldPubId', file.publicId, {
              shouldValidate: true,
              shouldDirty: true,
            })
        } else {
            field.onChange('');
            form.setValue('bannerCldPubId', '', {
                shouldValidate: true,
                shouldDirty: true,
            })
        }
    }

    return (
        <CreateView className='class-view'>
            <Breadcrumb />

            <h1 className='page-title'>Create a Class</h1>

            <div className='page-content'>
                <p>Provide the required information below to add a class.</p>
                <Button onClick={back}>Go Back</Button>
            </div>

            <Separator />

            <div className='my-4 flex items-center'>
                <Card className='class-form-card'>
                    <CardHeader className='relative z-10'>
                        <CardTitle className='text-2xl pb-0 font-bold'>Fill out the Form</CardTitle>
                    </CardHeader>
                    
                    <Separator/>
                    
                    <CardContent className='relative z-10'>
                        {/* Wrap everything in the Shadcn Form Provider */}
                        <Form {...form}>
                            <form id="bug-report-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={control}
                                    name="bannerUrl"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Banner Image <span className='text-orange-600'>*</span></FormLabel>
                                            <FormControl>
                                                <UploadWidget
                                                    value={field.value ? {
                                                    url: field.value,
                                                    publicId: bannerPublicId ?? ''} : null}
                                                    onChange={(file: any) => setBannerImage
                                                    (file, field)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.bannerCldPubId && !errors.bannerUrl && (
                                                <p className='text-destructive text-sm'>
                                                    {errors.bannerCldPubId.message?.toString()}</p>
                                            )}
                                        </FormItem>
                                    )}


                                />
                                {/* Title Field */}
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class Name <span className='text-orange-600'>*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Introduction to Biology - Section A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject <span className='text-orange-600'>*</span></FormLabel>
                                                    <Select onValueChange={(value) =>
                                                        field.onChange(Number(value))}
                                                            value={field.value?.toString()} >
                                                <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a Subject'/>
                                                        </SelectTrigger>
                                                </FormControl>
                                                        <SelectContent>
                                                            {subjects.map((subject) => (
                                                                <SelectItem value={subject.id.toString()} key={subject.id}>
                                                                    {subject.name}({subject.code})
                                                                </SelectItem>))}
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="teacherId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Teacher <span className='text-orange-600'>*</span></FormLabel>
                                                <Select onValueChange={(value) =>
                                                    field.onChange(value)}
                                                        value={field.value?.toString()} >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a teacher'/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {teachers.map((teachers) => (
                                                            <SelectItem value={teachers.id.toString()} key={teachers.id}>
                                                                {teachers.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name="capacity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Capacity</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="30"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            field.onChange(value ? Number(value) : undefined);
                                                        }}
                                                        value={(field.value as number | undefined) ?? ""}
                                                        name={field.name}
                                                        ref={field.ref}
                                                        onBlur={field.onBlur}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Status <span className="text-orange-600">*</span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Brief description about the class"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator />

                                <Button type="submit" size="lg" className="w-full">
                                    {isSubmitting ? (
                                        <div className="flex gap-1">
                                            <span>Creating Class...</span>
                                            <Loader2 className="inline-block ml-2 animate-spin" />
                                        </div>
                                    ) : ("Create Class")}
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CreateView>
    )
}
export default Create
