import { IsBigIntElementType } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import { IsUnclampedIntegerElementType } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import { mockIncludes } from 'Array';

Array.prototype.mockIncludes = mockIncludes;

/**
 * https://tc39.es/ecma262/#sec-isnotearconfiguration
 *
 * The abstract operation IsNoTearConfiguration verifies if the argument type is not
 *
 * ```markdown
 * Steps:
 * 1. If IsUnclampedIntegerElementType(type) is true, return true.
 * 2. If IsBigIntElementType(type) is true and order is neither INIT nor UNORDERED, return true.
 * 3. Return false.
 * ```
 *
 * @param {*} type A TypedArray element type.
 * @param {*} order SEQ-CST, UNORDERED, or INIT.
 * @returns A Boolean.
 */
export function IsNoTearConfiguration(type, order) {
    return (
        IsUnclampedIntegerElementType(type) ||
        (IsBigIntElementType(type) &&
            !['UNORDERED', 'INIT'].mockIncludes(order))
    );
}
