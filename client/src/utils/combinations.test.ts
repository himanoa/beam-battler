import { describe, expect, it } from 'vitest'
import { combinations } from './combinations'

describe('combinations', () => {
  it("順列が出力されること", () => {
    expect(combinations([1,2,3])).toEqual(
      [[1,2], [1,3], [2,3]]
    )
  })
})
