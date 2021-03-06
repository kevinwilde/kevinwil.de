---
title: Incremental Migration
date: "2019-06-16"
description: ""
---

TypeScript has exploded in popularity over the past couple years. If you asked a random developer why they think this has happened, they might say something about the value of static type-checking. It helps prevent bugs, it's easier to understand code when you precisely know the shape of objects, it enables a better developer experience, it allows for greater confidence when refactoring, etc. These are all great benefits of using TypeScript, but in my opinion these benefits alone would not have been sufficient for TypeScript to become popular.

A key feature of TypeScript is how easy it makes incremental migration of an existing JavaScript codebase. An incremental migration path is one of the most essential conditions for the successful adoption of a programming language, framework, library, or tool. React and GraphQL are two other examples of projects that grew quicklybecause they provided a good migration path.

At Course Hero, we began using TypeScript a few years ago, slowly transitioning our frontend JavaScript code to TypeScript. Because we were transitioning existing JavaScript code, we set up our `tsconfig.json` to be "lenient". `strictNullChecks` and `noImplicitAny` were both set to false. In an ideal world, or if you are starting a new TypeScript project from scratch, it is very useful to have these settings turned on. When they are off, TypeScript will allow the following code:

```TypeScript
function strLen(s: string): number {
    return s.length
}

strLen(null)
```

Of course, this will result in an error at runtime. The point of using TypeScript is to catch type errors at build time! With `strictNullChecks` turned on, the TypeScript compiler will in fact catch this error and fail to compile your code.

As I mentioned, though, we were migrating a significant amount of JavaScript code to TypeScript. We wanted to be able to start using TypeScript immediately without having to fix all of the places that would fail these stricter checks. Using a "lenient" `tsconfig.json` allowed us to start reaping some of the benefits of TypeScript immediately.

After all of our non-legacy frontend code had been migrated to TypeScript, we decided that it should be a goal to turn on `strictNullChecks` and `noImplicitAny`. However, it wasn't practical to try to change all the places that needed to be fixed at once. In a codebase as large as ours, there were thousands of errors when trying to compile with these stricter settings. We needed an incremental migration path!

Our build process is set up in such a way that we can compile apps separately when doing local development, and then when we push to production, our CI will only compile the apps that have changed even though they are in a monolithic codebase. Because we have this per-app build process, we made a slight modification to allow each app to configure its own settings for `strictNullChecks` and `noImplicitAny`. This way those settings can be turned on one app at a time. It is much easier to get one app to comply with these stricter checks than to try to get all of our apps to comply.

Each app has a small build config file (to configure a bundle name, entry point, and output path). This file is where we can configure `strictNullChecks` and `noImplicitAny` for just that app. To encourage apps to turn on these settings, an engineer added the following lines to all of our app config files:
```
strictNullChecks: false, // TODO change to true
noImplicityAny: false, // TODO change to true
```

With that, we had an incremental migration path in place.

Fast forward a year, and I started thinking about `strictNullChecks` and `noImplicitAny` again. I was working on an app that a different team had written, so I wasn't very familiar with it, and it was frustrating to never be certain if an object really matched the type it had been annotated with or if it was `null`. I decided to check if we made any progress on moving towards `strictNullChecks` and `noImplicitAny`. Looking at our app config files, I found that a grand total of 0 of those `TODO change to true`s had been done.

Our incremental migration path wasn't working.

Why didn't this path work? One obvious reason stood out to me, and it has to do with IDEs. When writing TypeScript code, IDEs use `tsconfig.json` to determine what they should underline as an error. Since our `tsconfig.json` still had `strictNullChecks` and `noImplicitAny` set to false, people didn't even realize when they were writing code that would fail these checks. Their IDE didn't report any errors and the build task succeeded, so how could they know? This meant that rather than moving closer towards enabling `strictNullChecks` and `noImplicitAny`, we were actively adding code that was not compliant with `strictNullChecks` and `noImplicitAny`.

As I thought about this, I began working on a different incremental migration strategy. First, we would set `strictNullChecks` and `noImplicitAny` to true in `tsconfig.json`, which would cause developers to become aware of the places that didn't comply with these checks and hopefully allow them to comply with these checks perfectly when writing new code. During the build process, we would override these two settings with whatever value was configured for them in the app config file. This would allow all of our apps to still compile, while surfacing the errors to developers in their IDEs.

Shortly after I put this strategy in place, a friend sent me this great [blog post from the VS Code team](https://code.visualstudio.com/blogs/2019/05/23/strict-null) about how they migrated to strict null checks. The basic approach is that they have a list of files that are already compliant with strict null checks. During the build process, they make sure that there are no regressions in any of these files.

I realized that we could adopt this same strategy at Course Hero. The VS Code team wrote a couple scripts to automatically generate the list of files that are already compliant with strict null checks, and [shared them on GitHub](https://github.com/mjbvz/vscode-strict-null-check-migration-tools). I forked these scripts and adapted them to the Course Hero codebase. I was able to generate a list of our own files that were already compliant with strict null checks and added a step to the build process to run the TypeScript compiler against this list of files. Now, we are able to prevent regressions against strict null checks by failing the build when a regression happens.

By surfacing errors in the IDE and preventing regressions during the build process, we are having much more success at moving towards enabling `strictNullChecks` and `noImplicitAny`. We still aren't there yet, but we're making progress!

## Update February 2021:

Using this approach, we have made significant progress towards reaching the point where our strictNullChecks and noImplicitAny can be enabled across our entire frontend codebase. Last year, we noticed the list of files that were already compliant with strict null checks had grown to be far larger than the list of files that were not compliant. We updated our fork of the VS Code strict null migration scripts to generate a list of files that are not compliant instead of a list of files that are compliant. Now newly-created files will be required to be compliant by default, whereas previously they had to be added to the list before they would be checked during CI.

Today, we have only a handful of isolated areas in our frontend codebase that remain incompatible with strictNullChecks and noImplicitAny, in places that have been rarely touched over the past two years. The rest of the codebase has been migrated to these settings without ever having to dedicate a large chunk of time specifically to this effort. The migration proceeded in a natural way: as new files were added and existing files were updated, engineers would fix any issues that were shown in their IDE. Over time, these incremental changes have added up to a major improvement in the quality of our frontend codebase.
