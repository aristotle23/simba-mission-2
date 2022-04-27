import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { Fragment, useState } from "react";

import Banner from "@components/Banner";
import BookingForm from "@components/BookingForm";
import BookingLayout from "@components/BookingLayout";

interface BookingProp {
  meeting: {
    user: {
      name: string;
      username: string;
    };
    id: number;
    title: string;
    description: string;
    duration: number;
  };
}

export default function Booking(props: BookingProp) {
  const meeting = props.meeting;
  const [isBooked, setIsBooked] = useState(false);

  let form = (
    <BookingForm
      params={{ username: meeting.user.username, meetingId: meeting.id }}
      setIsBooked={setIsBooked}
    />
  );
  if (isBooked) {
    form = (
      <Fragment>
        <Banner message={"You have booked your meeting"} />

        <p className="mt-4 text-sm text-center text-gray-400">
          Don&apos;t have an account?
          <Link href="/auth/signup">
            <a className="text-indigo-600"> Create account </a>
          </Link>
          or
          <Link href="/auth/login">
            <a className="text-indigo-600"> Login </a>
          </Link>
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <BookingLayout meeting={meeting}>{form}</BookingLayout>;
    </Fragment>
  );
}
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const eventTypes = await prisma.eventType.findMany({
    include: {
      user: true,
    },
  });

  const paths = eventTypes.map((type) => {
    return {
      params: {
        username: type.user.username,
        eventId: type.id,
      },
    };
  });
  return {
    fallback: false,
    paths: paths,
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username;
  const eventId = context.params?.eventId;
  const prisma = new PrismaClient();
  const meeting = await prisma.eventType.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    select: {
      duration: true,
      description: true,
      title: true,
      id: true,
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });
  return {
    props: {
      meeting: meeting,
    },
    revalidate: 80,
  };
};
