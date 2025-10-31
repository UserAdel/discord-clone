import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as scoketIOServer } from "socket.io";

import { Member, Profile, Server } from "./lib/generated/prisma";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: scoketIOServer;
    };
  };
};
