export type AggregationStage =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { $match: Record<string, any> }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { $sort: Record<string, any> }
  | { $skip: number }
  | { $limit: number }
  | { $lookup: { from: string; localField: string; foreignField: string; as: string } }
  | { $unwind: string };
