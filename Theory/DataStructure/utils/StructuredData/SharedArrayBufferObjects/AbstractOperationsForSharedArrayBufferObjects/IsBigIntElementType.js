/**
 * ```markdown
 * The abstract operation IsBigIntElementType verifies if the argument type is a BigInt TypedArray element type.
 *
 * Steps:
 * 1. If type is either BIGUINT64 or BIGINT64, return true.
 * 2. Return false.
 * ```
 * @param {*} type A TypedArray element type.
 * @returns A Boolean.
 *
 * https://tc39.es/ecma262/#sec-isbigintelementtype
 */
export function IsBigIntElementType(type) {
    const BigIntElementTypeArr = ['BIGUINT64', 'BIGINT64'];

    return BigIntElementTypeArr.includes(type);
}
