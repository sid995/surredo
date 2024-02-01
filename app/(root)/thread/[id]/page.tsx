import ThreadCard from '@/components/cards/ThreadCard'
import CommentForm from '@/components/forms/CommentForm'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

interface ChildThreadMap {
  _id: string;
  id: string;
  parentId: string;
  text: string;
  author: {
    name: string;
    image: string;
    id: string
  };
  community: {
    id: string;
    name: string;
    image: string
  } | null;
  createdAt: string;
  children: {
    author: {
      image: string
    }
  }[]
}

const Page = async ({ params }: Props) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const thread = await fetchThreadById(params.id)

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        <CommentForm
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((th: ChildThreadMap) => {
          return (
            <ThreadCard
              key={th._id}
              id={th._id}
              currentUserId={th?.id || ""}
              parentId={th.parentId}
              content={th.text}
              author={th.author}
              community={th.community}
              createdAt={th.createdAt}
              comments={th.children}
              isComment={true}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Page