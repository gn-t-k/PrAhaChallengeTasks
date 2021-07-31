import { Router } from "express";
import { DeleteRouteRegistrar } from "presentation/implementation/express/route-registrar/delete-route-registrar";
import { GetRouteRegistrar } from "presentation/implementation/express/route-registrar/get-route-registrar";
import { PostRouteRegistrar } from "presentation/implementation/express/route-registrar/post-route-registrar";
import { PutRouteRegistrar } from "presentation/implementation/express/route-registrar/put-route-registrar";

type RouteRegistrars = {
  getRouteRegistrar: GetRouteRegistrar;
  postRouteRegistrar: PostRouteRegistrar;
  putRouteRegistrar: PutRouteRegistrar;
  deleteRouteRegistrar: DeleteRouteRegistrar;
};

export class RouteRegistrarsFactory {
  public constructor(private readonly router: Router) {}

  public execute = (): RouteRegistrars => {
    const getRouteRegistrar = new GetRouteRegistrar(this.router);
    const postRouteRegistrar = new PostRouteRegistrar(this.router);
    const putRouteRegistrar = new PutRouteRegistrar(this.router);
    const deleteRouteRegistrar = new DeleteRouteRegistrar(this.router);

    return {
      getRouteRegistrar,
      postRouteRegistrar,
      putRouteRegistrar,
      deleteRouteRegistrar,
    };
  };
}
