import { Router } from 'express';
import { Controller } from '@/controllers/Controller';

export abstract class Routes {
  constructor(
    private readonly _controller: Controller,
    private readonly _router: Router,
    private readonly _url: string,
  ) {
    this.routers();
  }

  protected routers() {
    this._router.post(`/v1/${this._url}`, (req, res) =>
      this._controller.create(req, res),
    );
    this._router.get(`/v1/${this._url}`, (req, res) =>
      this._controller.read(req, res),
    );
    this._router.put(`/v1/${this._url}/:id`, (req, res) =>
      this._controller.update(req, res),
    );
    this._router.delete(`/v1/${this._url}/:id`, (req, res) =>
      this._controller.delete(req, res),
    );
  }

  get router(): Router {
    return this._router;
  }
}
