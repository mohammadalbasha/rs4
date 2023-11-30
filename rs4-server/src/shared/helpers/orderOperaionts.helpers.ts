export async function reorderItems(
  items: any[],
  prismaModel: any,
  itemBeforeUpdate: any,
  itemAfterUpdate: any,
) {
  if (itemBeforeUpdate?.['order'] > itemAfterUpdate?.['order']) {
    const itemsNeedTonIncreaseOrder = items.filter(
      (p) =>
        p.order >= itemAfterUpdate?.['order'] &&
        p.order < itemBeforeUpdate?.['order'],
    );
    await prismaModel.updateMany({
      where: { id: { in: itemsNeedTonIncreaseOrder.map((p) => p.id) } },
      data: {
        order: { increment: 1 },
      },
    });
  } else if (itemBeforeUpdate?.['order'] < itemAfterUpdate?.['order']) {
    const itemsNeedToDecreaseOrder = items.filter(
      (p) =>
        p.order > itemBeforeUpdate?.['order'] &&
        p.order <= itemAfterUpdate?.['order'],
    );

    await prismaModel.updateMany({
      where: { id: { in: itemsNeedToDecreaseOrder.map((p) => p.id) } },
      data: {
        order: { decrement: 1 },
      },
    });
  }
}

export function getMaximumOrder(objs: any[]) {
  let maxOrder = 0;
  if (objs.length > 0)
    objs.forEach(
      (obj) => (maxOrder = obj?.['order'] > maxOrder && obj?.['order']),
    );

  return maxOrder;
}
