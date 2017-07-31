import {
  NodeRemovedEvent,
  NodeRenamedEvent,
  NodeCreatedEvent,
  NodeSelectedEvent,
  NodeMovedEvent,
  NodeExpandedEvent,
  NodeCollapsedEvent
} from './tree.events';
import { RenamableNode } from './tree.types';
import { Tree } from './tree';
import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject, ElementRef } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEvent } from './draggable/draggable.events';

@Injectable()
export class TreeService {
  public nodeMoved$: Subject<NodeMovedEvent> = new Subject<NodeMovedEvent>();
  public nodeRemoved$: Subject<NodeRemovedEvent> = new Subject<NodeRemovedEvent>();
  public nodeRenamed$: Subject<NodeRenamedEvent> = new Subject<NodeRenamedEvent>();
  public nodeCreated$: Subject<NodeCreatedEvent> = new Subject<NodeCreatedEvent>();
  public nodeSelected$: Subject<NodeSelectedEvent> = new Subject<NodeSelectedEvent>();
  public nodeExpanded$: Subject<NodeExpandedEvent> = new Subject<NodeExpandedEvent>();
  public nodeCollapsed$: Subject<NodeCollapsedEvent> = new Subject<NodeCollapsedEvent>();

  public constructor(@Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService) {
    this.nodeRemoved$.subscribe((e: NodeRemovedEvent) => e.node.removeItselfFromParent());
    // var clicks = Observable.fromEvent(document, 'click');
    // clicks.subscribe(x => console.log(x));
    // 

    // var observable = Observable.interval(1000);
    // observable.subscribe(x => console.log('A' +x));
    // observable.subscribe(x => console.log('B' +x));

    // var foo = Observable.create((observer) => {
    //   var i = 0
    //   setInterval(() => {
    //     observer.next(i++)
    //     console.log('hello')
    //   }, 1000)
    // })
    // const subcription = foo.subscribe((i) => console.log(i))

    // var subject = new Subject();
    // subject.subscribe({
    //   next: (v) => console.log('observerA: ' + v)
    // });
    // subject.subscribe({
    //   next: (v) => console.log('observerB: ' + v)
    // });
    // // var observable = Observable.from([1, 2, 3]);
    // var observable = Observable.interval(1000);
    // observable.subscribe(subject);
  }

  public unselectStream(tree: Tree): Observable<any> {
    return this.nodeSelected$.filter((e: NodeSelectedEvent) => tree !== e.node);
  }

  public fireNodeRemoved(tree: Tree): void {
    this.nodeRemoved$.next(new NodeRemovedEvent(tree));
  }

  public fireNodeCreated(tree: Tree): void {
    this.nodeCreated$.next(new NodeCreatedEvent(tree));
  }

  public fireNodeSelected(tree: Tree): void {
    this.nodeSelected$.next(new NodeSelectedEvent(tree));
  }

  public fireNodeRenamed(oldValue: RenamableNode | string, tree: Tree): void {
    this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
  }

  public fireNodeMoved(tree: Tree, parent: Tree): void {
    this.nodeMoved$.next(new NodeMovedEvent(tree, parent));
  }

  public fireNodeSwitchFoldingType(tree: Tree): void {
    if (tree.isNodeExpanded()) {
      this.fireNodeExpanded(tree);
    } else if (tree.isNodeCollapsed()) {
      this.fireNodeCollapsed(tree);
    }
  }

  private fireNodeExpanded(tree: Tree): void {
    this.nodeExpanded$.next(new NodeExpandedEvent(tree));
  }

  private fireNodeCollapsed(tree: Tree): void {
    this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
  }

  public draggedStream(tree: Tree, element: ElementRef): Observable<NodeDraggableEvent> {
    return this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.target === element)
      .filter((e: NodeDraggableEvent) => !e.captured.tree.hasChild(tree));
  }
}
