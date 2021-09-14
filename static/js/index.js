/*! For license information please see index.js.LICENSE.txt */
 2] * z0);\n        }\n        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;\n        if (t1 < 0)\n            n1 = 0.0;\n        else {\n            const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;\n            t1 *= t1;\n            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);\n        }\n        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;\n        if (t2 < 0)\n            n2 = 0.0;\n        else {\n            const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;\n            t2 *= t2;\n            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);\n        }\n        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;\n        if (t3 < 0)\n            n3 = 0.0;\n        else {\n            const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;\n            t3 *= t3;\n            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);\n        }\n        // Add contributions from each corner to get the final noise value.\n        // The result is scaled to stay just inside [-1,1]\n        return 32.0 * (n0 + n1 + n2 + n3);\n    }\n    /**\n     * Samples the noise field in 4 dimensions\n     * @param x\n     * @param y\n     * @param z\n     * @returns a number in the interval [-1, 1]\n     */\n    noise4D(x, y, z, w) {\n        const perm = this.perm;\n        let n0, n1, n2, n3, n4; // Noise contributions from the five corners\n        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in\n        const s = (x + y + z + w) * F4; // Factor for 4D skewing\n        const i = Math.floor(x + s);\n        const j = Math.floor(y + s);\n        const k = Math.floor(z + s);\n        const l = Math.floor(w + s);\n        const t = (i + j + k + l) * G4; // Factor for 4D unskewing\n        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space\n        const Y0 = j - t;\n        const Z0 = k - t;\n        const W0 = l - t;\n        const x0 = x - X0; // The x,y,z,w distances from the cell origin\n        const y0 = y - Y0;\n        const z0 = z - Z0;\n        const w0 = w - W0;\n        // For the 4D case, the simplex is a 4D shape I won't even try to describe.\n        // To find out which of the 24 possible simplices we're in, we need to\n        // determine the magnitude ordering of x0, y0, z0 and w0.\n        // Six pair-wise comparisons are performed between each possible pair\n        // of the four coordinates, and the results are used to rank the numbers.\n        let rankx = 0;\n        let ranky = 0;\n        let rankz = 0;\n        let rankw = 0;\n        if (x0 > y0)\n            rankx++;\n        else\n            ranky++;\n        if (x0 > z0)\n            rankx++;\n        else\n            rankz++;\n        if (x0 > w0)\n            rankx++;\n        else\n            rankw++;\n        if (y0 > z0)\n            ranky++;\n        else\n            rankz++;\n        if (y0 > w0)\n            ranky++;\n        else\n            rankw++;\n        if (z0 > w0)\n            rankz++;\n        else\n            rankw++;\n        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.\n        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w\n        // impossible. Only the 24 indices which have non-zero entries make any sense.\n        // We use a thresholding to set the coordinates in turn from the largest magnitude.\n        // Rank 3 denotes the largest coordinate.\n        // Rank 2 denotes the second largest coordinate.\n        // Rank 1 denotes the second smallest coordinate.\n        // The integer offsets for the second simplex corner\n        const i1 = rankx >= 3 ? 1 : 0;\n        const j1 = ranky >= 3 ? 1 : 0;\n        const k1 = rankz >= 3 ? 1 : 0;\n        const l1 = rankw >= 3 ? 1 : 0;\n        // The integer offsets for the third simplex corner\n        const i2 = rankx >= 2 ? 1 : 0;\n        const j2 = ranky >= 2 ? 1 : 0;\n        const k2 = rankz >= 2 ? 1 : 0;\n        const l2 = rankw >= 2 ? 1 : 0;\n        // The integer offsets for the fourth simplex corner\n        const i3 = rankx >= 1 ? 1 : 0;\n        const j3 = ranky >= 1 ? 1 : 0;\n        const k3 = rankz >= 1 ? 1 : 0;\n        const l3 = rankw >= 1 ? 1 : 0;\n        // The fifth corner has all coordinate offsets = 1, so no need to compute that.\n        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords\n        const y1 = y0 - j1 + G4;\n        const z1 = z0 - k1 + G4;\n        const w1 = w0 - l1 + G4;\n        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords\n        const y2 = y0 - j2 + 2.0 * G4;\n        const z2 = z0 - k2 + 2.0 * G4;\n        const w2 = w0 - l2 + 2.0 * G4;\n        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords\n        const y3 = y0 - j3 + 3.0 * G4;\n        const z3 = z0 - k3 + 3.0 * G4;\n        const w3 = w0 - l3 + 3.0 * G4;\n        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords\n        const y4 = y0 - 1.0 + 4.0 * G4;\n        const z4 = z0 - 1.0 + 4.0 * G4;\n        const w4 = w0 - 1.0 + 4.0 * G4;\n        // Work out the hashed gradient indices of the five simplex corners\n        const ii = i & 255;\n        const jj = j & 255;\n        const kk = k & 255;\n        const ll = l & 255;\n        // Calculate the contribution from the five corners\n        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;\n        if (t0 < 0)\n            n0 = 0.0;\n        else {\n            const gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;\n            t0 *= t0;\n            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);\n        }\n        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;\n        if (t1 < 0)\n            n1 = 0.0;\n        else {\n            const gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;\n            t1 *= t1;\n            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);\n        }\n        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;\n        if (t2 < 0)\n            n2 = 0.0;\n        else {\n            const gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;\n            t2 *= t2;\n            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);\n        }\n        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;\n        if (t3 < 0)\n            n3 = 0.0;\n        else {\n            const gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;\n            t3 *= t3;\n            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);\n        }\n        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;\n        if (t4 < 0)\n            n4 = 0.0;\n        else {\n            const gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;\n            t4 *= t4;\n            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);\n        }\n        // Sum up and scale the result to cover the range [-1,1]\n        return 27.0 * (n0 + n1 + n2 + n3 + n4);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimplexNoise);\n/**\n * Builds a random permutation table.\n * This is exported only for (internal) testing purposes.\n * Do not rely on this export.\n * @private\n */\nfunction buildPermutationTable(random) {\n    const p = new Uint8Array(256);\n    for (let i = 0; i < 256; i++) {\n        p[i] = i;\n    }\n    for (let i = 0; i < 255; i++) {\n        const r = i + ~~(random() * (256 - i));\n        const aux = p[i];\n        p[i] = p[r];\n        p[r] = aux;\n    }\n    return p;\n}\n/*\nThe ALEA PRNG and masher code used by simplex-noise.js\nis based on code by Johannes Baagøe, modified by Jonas Wagner.\nSee alea.md for the full license.\n*/\nfunction alea(seed) {\n    let s0 = 0;\n    let s1 = 0;\n    let s2 = 0;\n    let c = 1;\n    const mash = masher();\n    s0 = mash(' ');\n    s1 = mash(' ');\n    s2 = mash(' ');\n    s0 -= mash(seed);\n    if (s0 < 0) {\n        s0 += 1;\n    }\n    s1 -= mash(seed);\n    if (s1 < 0) {\n        s1 += 1;\n    }\n    s2 -= mash(seed);\n    if (s2 < 0) {\n        s2 += 1;\n    }\n    return function () {\n        const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32\n        s0 = s1;\n        s1 = s2;\n        return s2 = t - (c = t | 0);\n    };\n}\nfunction masher() {\n    let n = 0xefc8249d;\n    return function (data) {\n        data = data.toString();\n        for (let i = 0; i < data.length; i++) {\n            n += data.charCodeAt(i);\n            let h = 0.02519603282416938 * n;\n            n = h >>> 0;\n            h -= n;\n            h *= n;\n            n = h >>> 0;\n            h -= n;\n            n += h * 0x100000000; // 2^32\n        }\n        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32\n    };\n}\n//# sourceMappingURL=simplex-noise.js.map\n\n//# sourceURL=webpack://frontend/./node_modules/simplex-noise/dist/esm/simplex-noise.js?")}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/main.js")})();