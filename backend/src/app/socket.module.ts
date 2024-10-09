import { Module } from "@nestjs/common";
import { AppGateway } from "./app.gateway";

@Module({
  providers: [AppGateway],
  exports: [],
  imports: [],
  controllers: [],
})
export class SocketModule {}
